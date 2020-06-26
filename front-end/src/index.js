import "./styles.css";

import JobSearch from './Models/JobSearch';
import * as jobSearchView from './Views/jobSearchView';
import { elements, domStrings } from './Views/base';


//TODO: push search results to state
    //search state for sresults id & pass into renderPrewview function update preview job info.

//TODO: push input search criteria to state with a unique id  
//TODO: push search viewed to state



// =============================================================================
// APP INIT
// =============================================================================

const state = {
    search: {
        keyword: "",
        location: ""
    },
    results: {},

    viewed: {   
        id: "",
        job: {}
    },
    watching: {
        id: "",
        job: {}
    },
    applied: {    
        id: "",
        job: {}
    },
    archived: {
        id: "",
        job: {}
    }
};

window.state = state;



// =============================================================================
// SEARCH CONTROLLER
// =============================================================================

state.JobSearch = new JobSearch('#search-form', '.search-results', '.loading-element', '.search-btn');

// set country code
state.JobSearch.setCountryCode();

// add search listener

const controlSearch = () => {

    // clear DOM search inputs 
    
    // clear search results
    jobSearchView.clearSearchResults();
    
    // start loading animation
    jobSearchView.startLoading();
    
    // get search & location input field values
    const { search, location } = state.JobSearch.extractFormData(state.JobSearch.searchForm);
    // build url 
    const targetURL = `http://localhost:5000/?search=${search}&location=${location}&country=${state.JobSearch.countryCode}`;
    console.log('targetURL:');
    console.log(targetURL);
    
    // query API with url 
    fetch(targetURL)
        .then(response => response.json())
        .then(({ results }) => {

            console.log('results:');
            console.log(results);

            // remove loading animation
            jobSearchView.stopLoading();

            // add search results to state
            results.forEach(job => {             
                // state.results["id"] = job.id;
                state.results[`job-${job.id}`] = job;  
            })

            return results
                // for each results object, run renderJob(); 
                .map(job => 
                    jobSearchView.renderJob(job, state.JobSearch.currencySymbol)
                )
                .join('');
        })
        // update DOM with results
        .then(jobs => {
            state.JobSearch.resultsContainer.innerHTML = jobs;
            state.JobSearch.resultsContainer.style.overflow = "scroll";
            
            // convert sresults to array
            const sresults = [...document.querySelectorAll(domStrings.sresultsRow)];
            
            // add listeners to rendered job rows
            sresults.forEach(jobRow => {
                jobRow.addEventListener('click', e => {

                    const matchedJob = state.JobSearch.getJob(state.results, e.currentTarget.dataset.id);                
                    jobSearchView.updatePreview(matchedJob, '£', elements);
                })
            });
        })
        
        // if error, stop loading animation
        .catch(() => jobSearchView.stopLoading());
}

// add event listener
state.JobSearch.findBtn.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});



// =============================================================================
// JOB CONTROLLER
// =============================================================================

// get jobs from seatch results & convert to array

//loop through sresults array & attach event listener(s)



// =============================================================================
// WATCH CONTROLLER
// =============================================================================



// =============================================================================
// APPLIED CONTROLLER
// =============================================================================






// instanciate jobSearch object for access to methods

// const jobSearchh = new JobSearch('#search-form', '.sresults-wrapper', '.loading-element');
// jobSearchh.setCountryCode();
// jobSearchh.configureFormListener();