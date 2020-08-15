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

    async getResults(url){
        const response = await fetch(url);
        const json = await response.json();
        return json.results;
    }

    async getCompanyData(job) {

        const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=:${job.company.display_name}`)
        const json = await res.json();
      
        try {   
                if (json.length >= 1) {
                    job.name = json[0].name;
                    job.domain = json[0].domain;
                    job.logo = json[0].logo;        
                }
                return job;
        } catch(error) {
            alert(error);
        }
        
    };


    async addCompanyData(resultsArr) {
        for (const job of resultsArr) {
            // get company data, add to job obj & return
           const newJob = await state.JobSearch.getCompanyData(job); 
           // overwrite existing job in state.results with updated job obj
           state.results[`job-${job.id}`] = newJob;  
        }
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

    getJob(stateObj, id) {
        // console.log('id passed into getJob');
        // console.log(id);
        for (const [key, value] of Object.entries(stateObj)) {

            if (value.id === id) { 
                return value;
            } 
            
       }
    }

    // addProp(job, type){
    //     // add prop to job
    //     job[type] = true;

    //     // return job
    //     return job;
    // }

    // removeProp(job, type){
    //     // set job type prop to false
    //     job[type] = false;

    //     //return job
    //     return job;
    // }

    addJob(job, id, objStr) {
        // take copy of state
        const copy = { ...state[objStr] };
        // add job to state copy
        copy[`job-${id}`] = job;
        // overwrite original state copy obj
        state[objStr] = copy;
        //update local storage 
        this.updateLocalStorage(objStr);
    }

    deleteJob(job, id, objStr) {
        // take copy of state.saved
        const copy = { ...state[objStr] };
        // delete job from state.saved copy
        delete copy[`job-${id}`];
        // overwrite original sate.saved obj
        state[objStr] = copy;
        //update local storage 
        this.updateLocalStorage(objStr);
    }


    updateLocalStorage(objStr) {
        localStorage.setItem(objStr, JSON.stringify(state[objStr]));
    }

    readLocalStorage(stateObj) {
        // convert state object keys to array
        const objArr = Object.keys(stateObj);
        // convert back to array using objArr keys to target local storage objects for copying to state
        objArr.map(obj => {       
            const storageObj = JSON.parse(localStorage.getItem(obj));

                if (storageObj) {
                    state[obj] = storageObj;
                }
            // if (storage) state[obj] = storage;
        });
    }

    

} // << End JobSearch class >>