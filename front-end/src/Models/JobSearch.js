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
            if (value.id == id) {
                return value;
            } else {
                console.log('cant find job');  
            }
       }
    }

    // syncLocalStorage = stateObj => {
    //     // create a copy of state 
    //     const obj = {...stateObj};
    //     // see fnyn.io
    // }
    


    // configureFormListener() {
    //     this.searchForm.addEventListener('submit', e => {
    //         // prevent form submission & page relaod
    //         event.preventDefault();
    //         // clear results
    //         this.resultsContainer.innerHTML = '';
    //         const { search, location } = extractFormData(this.searchForm);
    //         // inint loading animation
    //         jobSearchView.startLoading();

    //         fetch(`http://localhost:5000/?search=${search}&location=${location}&country=${this.countryCode}`)
    //             //convert response to json
    //             .then(response => response.json())
    //             .then(({ results }) => {
    //                 // end loading animation
    //                 jobSearchView.stopLoading();
    //                 return results
    //                     .map(job => jobTemplate(job, this.getCurrencySymbol))
    //                     .join('');
    //             })
    //             .then(jobs => this.resultsContainer.innerHTML = jobs)
    //             .catch(() => jobSearchView.stopLoading());
    //     });
    // }

}