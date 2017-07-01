declare module 'passport-vkontakte' {
  import passport = require('passport');
  import express = require('express');
  import OAuth2Strategy = require('passport-oauth2');

  interface IStrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }

  interface Profile extends passport.Profile {
    gender: string;
    username: string;

    _raw: string;
    _json: any;
    _accessLevel: string;
  }
  interface IStrategyOptionsWithRequest extends IStrategyOptions {
    passReqToCallback: true;
  }

  class Strategy implements passport.Strategy {
    name: string;
    authenticate: ( req: express.Request, options?: object ) => void;

    constructor( options: IStrategyOptions,
                 verify: ( accessToken: string, refreshToken: string, profile: Profile, done: ( error: any, user?: any ) => void ) => void );
    constructor( options: IStrategyOptionsWithRequest,
                 verify: ( req: express.Request, accessToken: string, refreshToken: string, profile: Profile, done: ( error: any, user?: any ) => void ) => void );


  }
}


