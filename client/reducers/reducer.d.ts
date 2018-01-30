import { Action } from 'redux';
import { Channel } from '../reducers/reducer';
import { Program } from '../reducers/reducer';
export interface GlobalState {
    counter: number;
    programUpdateState: string;
    tvChannels: Channel[];
    recorderTimers: Program[];
    tvPrograms: Program[];
    tags: Tag[];
}
export declare const initialState: {
    counter: number;
    programUpdateState: string;
    tvChannels: never[];
    recorderTimers: never[];
    tvPrograms: never[];
    tags: never[];
};
export interface Channel {
    ID: string;
    Tp: string;
    DisplayName: string;
    TransportStreamID: string;
    OriginalNetworkID: string;
    ServiceID: string;
    key: string;
    tags: string[];
    visible: boolean;
}
export interface Program {
    Channel: string;
    Title: string;
    Desc: string;
    Category: string[];
    Start: string;
    Stop: string;
    EventId: string;
    FileName: string;
    key: string;
}
export interface Tag {
    TagName: string;
    Category: string;
}
declare const reducer: (state: GlobalState | undefined, action: Action) => GlobalState;
export default reducer;
