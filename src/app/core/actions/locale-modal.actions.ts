import { Action } from '@ngrx/store';

export enum LocaleModalActionTypes {
    Open = '[Locale Modal] Open',
    Close = '[Locale Modal] Close',
}

export class Open implements Action {
    readonly type = LocaleModalActionTypes.Open;
}

export class Close implements Action {
    readonly type = LocaleModalActionTypes.Close;
}

export type LocaleModalActions = Open | Close;
