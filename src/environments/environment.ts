// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    apiDomain: 'https://localhost:3002',
    apiAddress: 'https://localhost:3002/api/v1',
    authAddress:
        // tslint:disable-next-line:max-line-length
        'https://kr.battle.net/login/ko/?ref=https://kr.battle.net/oauth/authorize?response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Flocalhost:3002%252Fapi%252Fv1%252Fauth%252Fbnet%252Fcallback%26client_id%3Dhmvrryh5b4c75r74mrheqvcfu84g7n2q&app=oauth',
};
