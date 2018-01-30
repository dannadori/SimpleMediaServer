import { Action } from 'redux';
import { Channel, Program, Tag } from '../reducers/reducer';
/*
 * action types
 */


/******/
export const TV_CHANNELS_GET = 'TV_CHANNELS_GET';
export const TV_CHANNELS_GET_SUCCESS = 'TV_CHANNELS_GET_SUCCESS';
export const TV_CHANNELS_GET_FAILED = 'TV_CHANNELS_GET_FAILED';

export const TV_CHANNELS_PATCH = 'TV_CHANNELS_PATCH';
export const TV_CHANNELS_PATCH_SUCCESS = 'TV_CHANNELS_PATCH_SUCCESS';
export const TV_CHANNELS_PATCH_FAILED = 'TV_CHANNELS_PATCH_FAILED';

/******/
export const TV_PROGRAMS_GET = 'TV_PROGRAMS_GET';
export const TV_PROGRAMS_GET_SUCCESS = 'TV_PROGRAMS_GET_SUCCESS';
export const TV_PROGRAMS_GET_FAILED = 'TV_PROGRAMS_GET_FAILED';

export const TV_PROGRAMS_UPDATE_POST = "TV_PROGRAMS_UPDATE_POST";
export const TV_PROGRAMS_UPDATE_POST_SUCCESS = "TV_PROGRAMS_UPDATE_POST_SUCCESS";
export const TV_PROGRAMS_UPDATE_POST_FAILED = "TV_PROGRAMS_UPDATE_POST_FAILED";

export const TV_PROGRAMS_UPDATE_GET = "TV_PROGRAMS_UPDATE_GET";
export const TV_PROGRAMS_UPDATE_GET_SUCCESS = "TV_PROGRAMS_UPDATE_GET_SUCCESS";
export const TV_PROGRAMS_UPDATE_GET_FAILED = "TV_PROGRAMS_UPDATE_GET_FAILED";

/******/
export const RECORDER_TIMERS_GET = 'RECORDER_TIMERS_GET';
export const RECORDER_TIMERS_GET_SUCCESS = 'RECORDER_TIMERS_GET_SUCCESS';
export const RECORDER_TIMERS_GET_FAILED = 'RECORDER_TIMERS_GET_FAILED';

export const RECORDER_TIMERS_POST = 'RECORDER_TIMERS_POST';
export const RECORDER_TIMERS_POST_SUCCESS = 'RECORDER_TIMERS_POST_SUCCESS';
export const RECORDER_TIMERS_POST_FAILED = 'RECORDER_TIMERS_POST_FAILED';

export const RECORDER_TIMERS_DELETE = 'RECORDER_TIMERS_DELETE';
export const RECORDER_TIMERS_DELETE_SUCCESS = 'RECORDER_TIMERS_DELETE_SUCCESS';
export const RECORDER_TIMERS_DELETE_FAILED = 'RECORDER_TIMERS_DELETE_FAILED';


/******/
export const TAGS_GET = 'TAGS_GET';
export const TAGS_GET_SUCCESS = 'TAGS_GET_SUCCESS';
export const TAGS_GET_FAILED = 'TAGS_GET_FAILED';

export const TAGS_POST = 'TAGS_POST';
export const TAGS_POST_SUCCESS = 'TAGS_POST_SUCCESS';
export const TAGS_POST_FAILED = 'TAGS_POST_FAILED';

export const TAGS_DELETE = 'TAGS_DELETE';
export const TAGS_DELETE_SUCCESS = 'TAGS_DELETE_SUCCESS';
export const TAGS_DELETE_FAILED = 'TAGS_DELETE_FAILED';


/******/
export interface TVChannelsGetAction extends Action {
  type: string;
  id: number;
}
export interface TVChannelsGetSuccessAction extends Action {
  type: string;
  id: number;
  channels: Channel[]
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
  channels: Channel[]
}
export interface TVChannelsPatchFailedAction extends Action {
  type: string;
  id: number;
}
/******/
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

/******/
export interface RecorderTimersGetAction extends Action {
  type: string;
  id: number;
}
export interface RecorderTimersGetSuccessAction extends Action {
  type: string;
  id: number;
  programs: Program[]
}
export interface RecorderTimersGetFailedAction extends Action {
  type: string;
  id: number;
}


export interface RecorderTimersPostAction extends Action {
  type: string;
  id: number;
  programs: Program[]
}
export interface RecorderTimersPostSuccessAction extends Action {
  type: string;
  id: number;
  programs: Program[]
}
export interface RecorderTimersPostFailedAction extends Action {
  type: string;
  id: number;
}

export interface RecorderTimersDeleteAction extends Action {
  type: string;
  id: number;
  programs: Program[]
}
export interface RecorderTimersDeleteSuccessAction extends Action {
  type: string;
  id: number;
  programs: Program[]
}
export interface RecorderTimersDeleteFailedAction extends Action {
  type: string;
  id: number;
}


/******/
export interface TagsGetAction extends Action {
  type: string;
  id: number;
}
export interface TagsGetSuccessAction extends Action {
  type: string;
  id: number;
  tags: Tag[]
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


/*
 * action creators
 */

 /******/
export function getTVChannels(): TVChannelsGetAction {
  return {
    id: 0,
    type: TV_CHANNELS_GET,
  };
}
export function getTVChannels_success(data:any): TVChannelsGetSuccessAction {
  return {
    id: 0,
    type: TV_CHANNELS_GET_SUCCESS,
    channels: data.Channels,
  };
}
export function getTVChannels_failed(error:any): TVChannelsGetFailedAction {
  return {
    id: 0,
    type: TV_CHANNELS_GET_FAILED,
  };
}

export function patchTVChannels(c:Channel): TVChannelsPatchAction {
  return {
    id: 0,
    type: TV_CHANNELS_PATCH,
    channel:c,
  };
}
export function patchTVChannels_success(data:any): TVChannelsPatchSuccessAction {
  return {
    id: 0,
    type: TV_CHANNELS_PATCH_SUCCESS,
    channels: data.Channels,
  };
}
export function patchTVChannels_failed(error:any): TVChannelsPatchFailedAction {
  return {
    id: 0,
    type: TV_CHANNELS_PATCH_FAILED,
  };
}

 /******/
 export function getTVPrograms(): TVProgramsGetAction {
  return {
    id: 0,
    type: TV_PROGRAMS_GET
  };
}
export function getTVPrograms_success(data:any): TVProgramsGetSuccessAction {
  return {
    id: 0,
    type: TV_PROGRAMS_GET_SUCCESS,
    programs: data.Programs
  };
}
export function getTVPrograms_failed(error:any): TVProgramsGetFailedAction {
  return {
    id: 0,
    type: TV_PROGRAMS_GET_FAILED
  };
}

export function postTVProgramsUpdate(): TVProgramsUpdatePostAction {
  return {
    id: 0,
    type: TV_PROGRAMS_UPDATE_POST
  };
}
export function postTVProgramsUpdate_success(data:any): TVProgramsUpdatePostSuccessAction {
  return {
    id: 0,
    type: TV_PROGRAMS_UPDATE_POST_SUCCESS,
    programs: data.Programs
  };
}
export function postTVProgramsUpdate_failed(error:any): TVProgramsUpdatePostFailedAction {
  return {
    id: 0,
    type: TV_PROGRAMS_UPDATE_POST_FAILED
  };
}

export function getTVProgramsUpdate(): TVProgramsUpdateGetAction {
  return {
    id: 0,
    type: TV_PROGRAMS_UPDATE_GET
  };
}
export function getTVProgramsUpdate_success(data:any): TVProgramsUpdateGetSuccessAction {
  return {
    id: 0,
    type: TV_PROGRAMS_UPDATE_GET_SUCCESS,
    programs: data.Programs
  };
}
export function getTVProgramsUpdate_failed(error:any): TVProgramsUpdateGetFailedAction {
  return {
    id: 0,
    type: TV_PROGRAMS_UPDATE_GET_FAILED
  };
}



 /******/
 export function getRecorderTimers(): RecorderTimersGetAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_GET,
  };
}
export function getRecorderTimers_success(data:any): RecorderTimersGetSuccessAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_GET_SUCCESS,
    programs: data.Programs,
  };
}
export function getRecorderTimers_failed(error:any): RecorderTimersGetFailedAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_GET_FAILED,
  };
}

export function postRecorderTimers(data:any): RecorderTimersPostAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_POST,
    programs: data.Programs,
  };
}
export function postRecorderTimers_success(data:any): RecorderTimersPostSuccessAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_POST_SUCCESS,
    programs: data.Programs,
  };
}
export function postRecorderTimers_failed(error:any): RecorderTimersPostFailedAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_POST_FAILED,
  };
}

export function deleteRecorderTimers(data:any): RecorderTimersDeleteAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_DELETE,
    programs: data.Programs,
  };
}
export function deleteRecorderTimers_success(data:any): RecorderTimersDeleteSuccessAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_DELETE_SUCCESS,
    programs: data.Programs,
  };
}
export function deleteRecorderTimers_failed(error:any): RecorderTimersDeleteFailedAction {
  return {
    id: 0,
    type: RECORDER_TIMERS_DELETE_FAILED,
  };
}


 /******/
 export function getTags(): TagsGetAction {
  return {
    id: 0,
    type: TAGS_GET,
  };
}
export function getTags_success(data:any): TagsGetSuccessAction {
  return {
    id: 0,
    type: TAGS_GET_SUCCESS,
    tags:data.Tags
  };
}
export function getTags_failed(error:any): TagsGetFailedAction {
  return {
    id: 0,
    type: TAGS_GET_FAILED,
  };
}

export function postTags(tag:Tag): TagsPostAction {
  return {
    id: 0,
    type: TAGS_POST,
    tag: tag,
  };
}
export function postTags_success(tag:Tag): TagsPostSuccessAction {
  return {
    id: 0,
    type: TAGS_POST_SUCCESS,
    tag: tag,
  };
}
export function postTags_failed(error:any): TagsPostFailedAction {
  return {
    id: 0,
    type: TAGS_POST_FAILED,
  };
}

export function deleteTags(tag:Tag): TagsDeleteAction {
  return {
    id: 0,
    type: TAGS_DELETE,
    tag: tag,
  };
}
export function deleteTags_success(data:any): TagsDeleteSuccessAction {
  return {
    id: 0,
    type: TAGS_DELETE_SUCCESS,
  };
}
export function deleteTags_failed(error:any): TagsDeleteFailedAction {
  return {
    id: 0,
    type: TAGS_DELETE_FAILED,
  };
}

