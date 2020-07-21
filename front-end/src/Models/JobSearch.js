import * as jobSearchView from '../Views/jobSearchView';

export default class JobSearch {
    constructor(
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector,
        findBtnSelector
    ) {
        // get dom elements and assign to object
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
        this.findBtn = document.querySelector(findBtnSelector);

    }

    setCountryCode() {
        // set default country code
        this.countryCode = 'gb';
        
        // const proxy = "https://cors-anywhere.herokuapp.com/";
        // fetch(`http://ip-api.com/json`, { 
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json'
        //     } })
        // .then(res => res.json())
        //     .then(results => {
        //         console.log('results;');
        //         console.log(results);
        //     this.countryCode = results.countryCode.toLowerCase();
            this.setCurrencySymbol();
        // })
    }

    getCurrencySymbol(countryCode) {
        const currencies = {
            gb: '£',
            us: '$',
            au: '$',
            ca: '$'
        };
        return currencies[countryCode];
    };

    extractFormData(form) {
        // extract from data and covert to object
        return Array.from(form.elements).reduce((acc, { id, value }) => ({...acc, [id]: value }), {});
    }

    setCurrencySymbol() {
        this.currencySymbol = this.getCurrencySymbol(this.countryCode);
    }


    // updateState(jobsArr, targetObjStr){
    //     jobsArr.forEach(job => {             
    //         // state.results["id"] = job.id;
    //         state.targetObjStr[`job-${job.id}`] = job;
    //     });
    // }

    // getJob(stateObj, id) {
    //     stateObj.forEach(job => {
    //         if (job.id == id) {
    //             return job;
    //         } else {console.log('cant find object!')}
    //     })
    // }

    getJob(stateObj, id) {
        for (const [key, value] of Object.entries(stateObj)) {
            if (value.id == id) { return value; } 
       }
    }

    addJob(job, id, stateObj) {
        //TODO: finish addJob func
        const saved = { ...state.saved };
        // add job to state.saved copy
        saved[`job-${id}`] = job;
        // overwrite original state.saved obj
        state.saved = saved;
    }

    deleteJob(job, id, stateObj) {
        // take copy of state.saved
        const saved = { ...state.saved };
        // delete job from state.saved copy
        delete saved[`job-${id}`];
        // overwrite original sate.saved obj
        state.saved = saved;
    }

    syncLocalStorage(stateObj) {
        // create a copy of state 
        const obj = {...stateObj};
        // see fnyn.io
    }
    


} // << End JobSearch class >>