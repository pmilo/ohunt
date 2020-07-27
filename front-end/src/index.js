import "./styles.css";

import JobSearch from './Models/JobSearch';
import * as jobSearchView from './Views/jobSearchView';
import * as navView from './Views/navView';
import { elements, domStrings } from './Views/base';

//TODO: wrap all listner functions into one func to invoke when rendering job rows

//TODO: create add to state & local storage click event for archive btns
//TODO: create add to job obj & add state/local storage click event for +note btns
//TODO: Indeed job search API/company logo API integration
//TODO: push input search criteria to state with a unique id
//TODO: add render job state function to reflect job status i.e saved, viewed archived.

//TODO: finish sresults job formatting
//TODO: redesign job preview pane





// =============================================================================
// APP INIT
// =============================================================================

const state = {

    results: {},
    saved: {},
    archived: {},
    viewed: {},
    applied: {    
        id: "",
        job: {}
    }
};

window.state = state;

window.addEventListener('load', () => {
    // Restore likes
    state.JobSearch.readLocalStorage(state);

    // update nav count
    //TODO: make func dynamic to update all nav/state types
    jobSearchView.updateNavJobCount(elements.savedJobsNav, state.saved);  
});



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
                    jobSearchView.renderJob(jobSearchView.formatJob(job), state.JobSearch.currencySymbol)
                )
                .join('');
        })
        // update DOM with results
        .then(jobs => {
            state.JobSearch.resultsContainer.innerHTML = jobs;
            state.JobSearch.resultsContainer.style.overflow = "scroll";
            
            // add search results listeners
            controlSresults();

            // update results nav count
            jobSearchView.updateNavJobCount(elements.resultsNav, state.results);

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
// SEARCH RESULTS CONTROLLER
// =============================================================================

const controlSresults = () => {
    //JOB ROW listener
    jobSearchView.jobRowListener("results");
    jobSearchView.saveJobBtnListener();
}

// =============================================================================
// JOB CONTROLLER
// =============================================================================

// get jobs from seatch results & convert to array

//loop through sresults array & attach event listener(s)



// =============================================================================
// NAV CONTROLLER
// =============================================================================
const controlNav = () => {
    elements.navRows.forEach(row => {
        navView.navRowListener(row);
    })
}
controlNav();

// =============================================================================
// APPLIED CONTROLLER
// =============================================================================


