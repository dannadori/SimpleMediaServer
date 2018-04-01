import { call, fork, take, put } from 'redux-saga/effects';
import {
    getTVChannels,

    getTVChannels_success,
    getTVChannels_failed,
    TV_CHANNELS_GET,

    getTVPrograms_success,
    getTVPrograms_failed,
    TV_PROGRAMS_GET,

    getTVProgramsUpdate_failed,
    getTVProgramsUpdate_success,
    postTVProgramsUpdate_failed,
    postTVProgramsUpdate_success,
    
    getRecorderTimers,
    getRecorderTimers_success,
    getRecorderTimers_failed,
    RECORDER_TIMERS_GET,
    postRecorderTimers_success,
    postRecorderTimers_failed,
    RECORDER_TIMERS_POST,
    deleteRecorderTimers_success,
    deleteRecorderTimers_failed,
    RECORDER_TIMERS_DELETE,

    getTags,
    getTags_success,
    getTags_failed,
    TAGS_GET,
    postTags_success,
    postTags_failed,
    TAGS_POST,
    deleteTags_success,
    deleteTags_failed,
    TAGS_DELETE,
    TV_PROGRAMS_UPDATE_POST,
    TV_PROGRAMS_UPDATE_GET,

} from '../actions/app';

import {
    editTVChannels_success,
    editTVChannels_failed,
    TV_CHANNELS_EDIT,

    toggleRecorderTimers_success,
    toggleRecorderTimers_failed,
    RECORDER_TIMERS_TOGGLE,

} from '../actions/app2';

function* handleRequestTVChannelsGet() {
    while (true) {
        const action = yield take(TV_CHANNELS_GET);
        try{
            let data = yield call((action) =>{
                console.log("start get tv channels")
                return fetch(`/api/tv-channels`)
                .then(res => res.json())
                .catch(error => {throw error})
            }, action);
            yield put(getTVChannels_success(data));
        }catch(e){
            yield put(getTVChannels_failed(e));
        }
    }
}

function* handleRequestTVProgramsGet() {
    while (true) {
        console.log("saga start")
        const action = yield take(TV_PROGRAMS_GET);
        //console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start get tv programs")
                return fetch(`/api/tv-programs`)
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(getTVPrograms_success(data));
        }catch(e){
            yield put(getTVPrograms_failed(e));
        }
    }
}

function* handleRequestTVProgramsUpdatePost() {
    while (true) {
        console.log("saga start")
        const action = yield take(TV_PROGRAMS_UPDATE_POST);
        //console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start update tv programs")
                return fetch(`/api/tv-programs/update`,{
                    method: 'POST',
                })
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(postTVProgramsUpdate_success(data));
        }catch(e){
            yield put(postTVProgramsUpdate_failed(e));
        }
    }
}
function* handleRequestTVProgramsUpdateGet() {
    while (true) {
        console.log("saga start")
        const action = yield take(TV_PROGRAMS_UPDATE_GET);
        //console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start update tv programs")
                return fetch(`/api/tv-programs/update`)
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(getTVProgramsUpdate_success(data));
        }catch(e){
            yield put(getTVProgramsUpdate_failed(e));
        }
    }
}


function* handleRequestRecorderTimersGet() {
    while (true) {
        console.log("saga start")
        const action = yield take(RECORDER_TIMERS_GET);
        //console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start get recorder timers")
                return fetch(`/api/recorder-timers`)
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(getRecorderTimers_success(data));
        }catch(e){
            yield put(getRecorderTimers_failed(e));
        }
    }
}


function* handleRequestRecorderTimersPost() {
    while (true) {
        console.log("saga start")
        const action = yield take(RECORDER_TIMERS_POST);
        //console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start post recorder timers")
                return fetch(`/api/recorder-timers`)
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(postRecorderTimers_success(data));
        }catch(e){
            yield put(postRecorderTimers_failed(e));
        }
    }
}

function* handleRequestRecorderTimersDelete() {
    while (true) {
        console.log("saga start")
        const action = yield take(RECORDER_TIMERS_DELETE);
        //console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start delete recorder timers")
                return fetch(`/api/recorder-timers`)
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(deleteRecorderTimers_success(data));
        }catch(e){
            yield put(deleteRecorderTimers_failed(e));
        }
    }
}


function* handleRequestTagsGet() {
    while (true) {
        console.log("saga start")
        const action = yield take(TAGS_GET);
        try{
            let data = yield call((action)=>{
                console.log("start get tags")
                return fetch(`/api/tags`)
                .then(res => res.json())
                .catch(error => {throw error})
            },action);
            yield put(getTags_success(data));
        }catch(e){
            yield put(getTags_failed(e));
        }
    }
}


function* handleRequestTagsPost() {
    while (true) {
        console.log("saga start")
        const action = yield take(TAGS_POST);
        console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start post tags")
                var tags:{[key:string]:any[]} ={Tags:[]}
                tags.Tags.push(action.tag)
                return fetch(`/api/tags`,{
                    method: 'POST',
                    headers: [['Accept', 'application/json'], ['Content-Type', 'application/json'],],
                    body: JSON.stringify(tags),
                })
                .then((res:any) => res.json())
                .catch((error:any) => {throw error})
            },action);
            yield put(postTags_success(data));
            yield put(getTags());

        }catch(e){
            yield put(postTags_failed(e));
        }
    }
}

function* handleRequestTagsDelete() {
    while (true) {
        console.log("saga start")
        const action = yield take(TAGS_DELETE);
        console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start delete tags")
                return fetch(`/api/tags/`+action.tag.Category+"/"+action.tag.TagName,{
                    method: 'DELETE',
                })
                .catch((error:any) => {throw error})
            },action);
            yield put(deleteTags_success(data));
            yield put(getTags());

        }catch(e){
            yield put(deleteTags_failed(e));
        }
    }
}




function* handleRequestTVChannelsEdit() {
    while (true) {
        console.log("saga start")
        const action = yield take(TV_CHANNELS_EDIT);
        console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start edit user channels")
                var ch:{[key:string]:any[]} ={Channels:[]}
                ch.Channels.push(action.channel)
                console.log(ch)

                return fetch(`/api/tv-channels/`+action.channel.ID,{
                    method: 'PATCH',
                    headers: [['Accept', 'application/json'], ['Content-Type', 'application/json'],],
                    body: JSON.stringify(ch),
                })
                .catch((error:any) => {throw error})
            },action);
            yield put(editTVChannels_success(data));
            yield put(getTVChannels());
        }catch(e){
            console.log(e)
            yield put(editTVChannels_failed(e));
        }
    }
}


function* handleRequestRecorderTimersToggle() {
    while (true) {
        console.log("saga start")
        const action = yield take(RECORDER_TIMERS_TOGGLE);
        console.log(action)
        try{
            let data = yield call((action)=>{
                console.log("start toggle recorder timers")
                var pr:{[key:string]:any[]} ={Programs:[]}
                pr.Programs.push(action.programs)
                if(action.del==true){
                    return fetch(`/api/recorder-timers/`+action.programs.key+"?mode=deleteFile",{
                        method: 'DELETE',
                    })
                    .catch((error:any) => {throw error})
                }else{
                    return fetch(`/api/recorder-timers`,{
                        method: 'POST',
                        headers: [['Accept', 'application/json'], ['Content-Type', 'application/json'],],
                        body: JSON.stringify(pr),
                    })
                    .then((res:any) => res.json())
                    .catch((error:any) => {throw error})
                }
            },action);
            yield put(toggleRecorderTimers_success(data));
            yield put(getRecorderTimers());
        }catch(e){
            console.log(e)
            yield put(toggleRecorderTimers_failed(e));
        }
    }
}


export default function* rootSaga() {
    yield fork(handleRequestTVChannelsGet);
    yield fork(handleRequestTVProgramsGet);
    yield fork(handleRequestTVProgramsUpdateGet);
    yield fork(handleRequestTVProgramsUpdatePost);
    yield fork(handleRequestRecorderTimersGet);
    yield fork(handleRequestRecorderTimersPost);
    yield fork(handleRequestRecorderTimersDelete);
    yield fork(handleRequestTagsGet);
    yield fork(handleRequestTagsPost);
    yield fork(handleRequestTagsDelete);

    yield fork(handleRequestTVChannelsEdit);
    yield fork(handleRequestRecorderTimersToggle);
    
         
}



