export const host: string = "https://sai-space.ddns.net";


export const AuthState = {
    token: undefined as string | undefined,
};

export enum RowState {
    Original,
    Added,
    Edited,
    Deleted,
    Unknown
}

export interface RowDetail {
    editable: boolean,
    state: RowState
}

