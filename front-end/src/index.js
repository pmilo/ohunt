import "./styles.css";

import JobSearch from './Models/JobSearch';
import * as jobSearchView from './Views/jobSearchView';



// =============================================================================
// APP INIT
// =============================================================================

const state = {};
window.state = state;



// =============================================================================
// SEARCH CONTROLLER
// =============================================================================

state.JobSearch = new JobSearch('#search-form', '.search-results', '.loading-element', '.search-btn');

// set country code
state.JobSearch.setCountryCode();

// add search listener

// jobSearchView.addFindBtnListener(state.JobSearch.findBtn);


const controlSearch = () => {

    
    // clear DOM search inputs 
    
    // clear search resukts
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
            console.log('state:');
            console.log(state);
            return results
                // for each results object, run renderJob(); 
                .map(job => jobSearchView.renderJob(job, state.JobSearch.currencySymbol))
                .join('');
        })
        // update DOM with results
        .then(jobs => {
            state.JobSearch.resultsContainer.innerHTML = jobs;
            state.JobSearch.resultsContainer.style.overflow = "scroll";

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

// select first job ad

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