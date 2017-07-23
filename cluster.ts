import * as cluster from 'cluster';
import { cpus } from 'os';

if ( cluster.isMaster ) {
  const cpusCount = cpus().length;
  for ( let i = 0; i < cpusCount; i += 1 ) {
    cluster.fork().on('listening', function() {
      console.log(`Started process PID: ${this.process.pid}`);
    });
  }
  console.log(`Master PID: ${process.pid}`);
  cluster.on('exit', ( worker, code ) => {
    if ( code !== 0 && !worker.exitedAfterDisconnect ) {
      console.log(`Worker ${worker.id} crashed. Starting new worker...`);
      cluster.fork();
    }
  });

  process.on('SIGUSR2', () => {
    console.log('Restart Workers...');
    const workers = Object.values(cluster.workers);
    const restartWorker = ( workerIndex ) => {
      const worker = workers[ workerIndex ];
      if ( !worker ) {
        return;
      }
      worker.on('disconnect', () => {
        if ( !worker.exitedAfterDisconnect ) {
          return;
        }
        console.log(`Stopped process PID: ${worker.process.pid}`);
        cluster.fork().on('listening', function() {
          console.log(`Started process PID: ${this.process.pid}`);
          restartWorker(workerIndex + 1);
        });
      });
      worker.disconnect();
    };
    restartWorker(0);
  });

} else {
  require('./index.ts');
}
