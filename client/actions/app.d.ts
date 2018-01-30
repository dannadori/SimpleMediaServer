import { Action } from 'redux';
import { Channel, Program, Tag } from '../reducers/reducer';
export declare const TV_CHANNELS_GET = "TV_CHANNELS_GET";
export declare const TV_CHANNELS_GET_SUCCESS = "TV_CHANNELS_GET_SUCCESS";
export declare const TV_CHANNELS_GET_FAILED = "TV_CHANNELS_GET_FAILED";
export declare const TV_CHANNELS_PATCH = "TV_CHANNELS_PATCH";
export declare const TV_CHANNELS_PATCH_SUCCESS = "TV_CHANNELS_PATCH_SUCCESS";
export declare const TV_CHANNELS_PATCH_FAILED = "TV_CHANNELS_PATCH_FAILED";
export declare const TV_PROGRAMS_GET = "TV_PROGRAMS_GET";
export declare const TV_PROGRAMS_GET_SUCCESS = "TV_PROGRAMS_GET_SUCCESS";
export declare const TV_PROGRAMS_GET_FAILED = "TV_PROGRAMS_GET_FAILED";
export declare const TV_PROGRAMS_UPDATE_POST = "TV_PROGRAMS_UPDATE_POST";
export declare const TV_PROGRAMS_UPDATE_POST_SUCCESS = "TV_PROGRAMS_UPDATE_POST_SUCCESS";
export declare const TV_PROGRAMS_UPDATE_POST_FAILED = "TV_PROGRAMS_UPDATE_POST_FAILED";
export declare const TV_PROGRAMS_UPDATE_GET = "TV_PROGRAMS_UPDATE_GET";
export declare const TV_PROGRAMS_UPDATE_GET_SUCCESS = "TV_PROGRAMS_UPDATE_GET_SUCCESS";
export declare const TV_PROGRAMS_UPDATE_GET_FAILED = "TV_PROGRAMS_UPDATE_GET_FAILED";
export declare const RECORDER_TIMERS_GET = "RECORDER_TIMERS_GET";
export declare const RECORDER_TIMERS_GET_SUCCESS = "RECORDER_TIMERS_GET_SUCCESS";
export declare const RECORDER_TIMERS_GET_FAILED = "RECORDER_TIMERS_GET_FAILED";
export declare const RECORDER_TIMERS_POST = "RECORDER_TIMERS_POST";
export declare const RECORDER_TIMERS_POST_SUCCESS = "RECORDER_TIMERS_POST_SUCCESS";
export declare const RECORDER_TIMERS_POST_FAILED = "RECORDER_TIMERS_POST_FAILED";
export declare const RECORDER_TIMERS_DELETE = "RECORDER_TIMERS_DELETE";
export declare const RECORDER_TIMERS_DELETE_SUCCESS = "RECORDER_TIMERS_DELETE_SUCCESS";
export declare const RECORDER_TIMERS_DELETE_FAILED = "RECORDER_TIMERS_DELETE_FAILED";
export declare const TAGS_GET = "TAGS_GET";
export declare const TAGS_GET_SUCCESS = "TAGS_GET_SUCCESS";
export declare const TAGS_GET_FAILED = "TAGS_GET_FAILED";
export declare const TAGS_POST = "TAGS_POST";
export declare const TAGS_POST_SUCCESS = "TAGS_POST_SUCCESS";
export declare const TAGS_POST_FAILED = "TAGS_POST_FAILED";
export declare const TAGS_DELETE = "TAGS_DELETE";
export declare const TAGS_DELETE_SUCCESS = "TAGS_DELETE_SUCCESS";
export declare const TAGS_DELETE_FAILED = "TAGS_DELETE_FAILED";
export interface TVChannelsGetAction extends Action {
    type: string;
    id: number;
}
export interface TVChannelsGetSuccessAction extends Action {
    type: string;
    id: number;
    channels: Channel[];
}
export interface TVChannelsGetFailedAction extends Action {
    type: string;
    id: number;
}
export interface TVChannelsPatchAction extends Action {
    type: string;
    id: number;
    channel: Channel;
}
export interface TVChannelsPatchSuccessAction extends Action {
    type: string;
    id: number;
    channels: Channel[];
}
export interface TVChannelsPatchFailedAction extends Action {
    type: string;
    id: number;
}
export interface TVProgramsGetAction extends Action {
    type: string;
    id: number;
}
export interface TVProgramsGetSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface TVProgramsGetFailedAction extends Action {
    type: string;
    id: number;
}
export interface TVProgramsUpdatePostAction extends Action {
    type: string;
    id: number;
}
export interface TVProgramsUpdatePostSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface TVProgramsUpdatePostFailedAction extends Action {
    type: string;
    id: number;
}
export interface TVProgramsUpdateGetAction extends Action {
    type: string;
    id: number;
}
export interface TVProgramsUpdateGetSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface TVProgramsUpdateGetFailedAction extends Action {
    type: string;
    id: number;
}
export interface RecorderTimersGetAction extends Action {
    type: string;
    id: number;
}
export interface RecorderTimersGetSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface RecorderTimersGetFailedAction extends Action {
    type: string;
    id: number;
}
export interface RecorderTimersPostAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface RecorderTimersPostSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface RecorderTimersPostFailedAction extends Action {
    type: string;
    id: number;
}
export interface RecorderTimersDeleteAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface RecorderTimersDeleteSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface RecorderTimersDeleteFailedAction extends Action {
    type: string;
    id: number;
}
export interface TagsGetAction extends Action {
    type: string;
    id: number;
}
export interface TagsGetSuccessAction extends Action {
    type: string;
    id: number;
    tags: Tag[];
}
export interface TagsGetFailedAction extends Action {
    type: string;
    id: number;
}
export interface TagsPostAction extends Action {
    type: string;
    id: number;
    tag: Tag;
}
export interface TagsPostSuccessAction extends Action {
    type: string;
    id: number;
    tag: Tag;
}
export interface TagsPostFailedAction extends Action {
    type: string;
    id: number;
}
export interface TagsDeleteAction extends Action {
    type: string;
    id: number;
    tag: Tag;
}
export interface TagsDeleteSuccessAction extends Action {
    type: string;
    id: number;
}
export interface TagsDeleteFailedAction extends Action {
    type: string;
    id: number;
}
export declare function getTVChannels(): TVChannelsGetAction;
export declare function getTVChannels_success(data: any): TVChannelsGetSuccessAction;
export declare function getTVChannels_failed(error: any): TVChannelsGetFailedAction;
export declare function patchTVChannels(c: Channel): TVChannelsPatchAction;
export declare function patchTVChannels_success(data: any): TVChannelsPatchSuccessAction;
export declare function patchTVChannels_failed(error: any): TVChannelsPatchFailedAction;
export declare function getTVPrograms(): TVProgramsGetAction;
export declare function getTVPrograms_success(data: any): TVProgramsGetSuccessAction;
export declare function getTVPrograms_failed(error: any): TVProgramsGetFailedAction;
export declare function postTVProgramsUpdate(): TVProgramsUpdatePostAction;
export declare function postTVProgramsUpdate_success(data: any): TVProgramsUpdatePostSuccessAction;
export declare function postTVProgramsUpdate_failed(error: any): TVProgramsUpdatePostFailedAction;
export declare function getTVProgramsUpdate(): TVProgramsUpdateGetAction;
export declare function getTVProgramsUpdate_success(data: any): TVProgramsUpdateGetSuccessAction;
export declare function getTVProgramsUpdate_failed(error: any): TVProgramsUpdateGetFailedAction;
export declare function getRecorderTimers(): RecorderTimersGetAction;
export declare function getRecorderTimers_success(data: any): RecorderTimersGetSuccessAction;
export declare function getRecorderTimers_failed(error: any): RecorderTimersGetFailedAction;
export declare function postRecorderTimers(data: any): RecorderTimersPostAction;
export declare function postRecorderTimers_success(data: any): RecorderTimersPostSuccessAction;
export declare function postRecorderTimers_failed(error: any): RecorderTimersPostFailedAction;
export declare function deleteRecorderTimers(data: any): RecorderTimersDeleteAction;
export declare function deleteRecorderTimers_success(data: any): RecorderTimersDeleteSuccessAction;
export declare function deleteRecorderTimers_failed(error: any): RecorderTimersDeleteFailedAction;
export declare function getTags(): TagsGetAction;
export declare function getTags_success(data: any): TagsGetSuccessAction;
export declare function getTags_failed(error: any): TagsGetFailedAction;
export declare function postTags(tag: Tag): TagsPostAction;
export declare function postTags_success(tag: Tag): TagsPostSuccessAction;
export declare function postTags_failed(error: any): TagsPostFailedAction;
export declare function deleteTags(tag: Tag): TagsDeleteAction;
export declare function deleteTags_success(data: any): TagsDeleteSuccessAction;
export declare function deleteTags_failed(error: any): TagsDeleteFailedAction;
