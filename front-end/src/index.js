import "./styles.css";

import JobSearch from './Models/JobSearch';
import * as jobSearchView from './Views/jobSearchView';
import * as navView from './Views/navView';
import { elements, domStrings } from './Views/base';


//TODO: Indeed job search API integration / Adzuna API plan upgrade - !full job desc not yet available.

//TODO: add tool tip for job boards to highlight purpose/function w/ option to ok/x - remember interaction; copy to state/local storage: { state.board - tool_tip: true/false }

//TODO: Add Notes feature
        // design notes component
        // add notes obj/array to job obj
        // add notes render
        // add +note btn listener

//TODO: remove archived jobs from state.results before rendering @findbtn listener

//TODO: push input search criteria to state with a unique id

//TODO: add up/down arrow indicator on sresults hover

//TODO: add search history component
        // design search history component
        // add search history data to state & local storage
        // search history render
        // add click event to trigger search with rendered search history data

//TODO: add error handling for NaN/min_salary data

//TODO: clear/reset preview component when switching job boards


// =============================================================================
// APP INIT
// =============================================================================

const state = {

    results: {},
    saved: {},
    archived: {},
};

window.state = state;

window.addEventListener('load', () => {
    // Restore saved/archived jobs from local storage
    state.JobSearch.readLocalStorage(state);
    
    //TODO: make func. dynamic to update all nav/state types
    // update nav count
    jobSearchView.updateNavJobCount(elements.savedJobsNav, state.saved);  
    jobSearchView.updateNavJobCount(elements.archivedNav, state.archived);
});



// =============================================================================
// SEARCH CONTROLLER
// =============================================================================

state.JobSearch = new JobSearch('#search-form', '.search-results', '.loading-element', '.search-btn');

// set country code -- defaulted to GB
state.JobSearch.setCountryCode();


const controlSearch = async ()  => {

    // clear state.results
    state.results = {};
    
    // clear search results
    jobSearchView.clearSearchResults();
    
    // start loading animation
    jobSearchView.startLoading();
    
    // get search & location input field values
    const { search, location } = state.JobSearch.extractFormData(state.JobSearch.searchForm);
    // build url 
    const targetURL = `http://localhost:5000/?search=${search}&location=${location}&country=${state.JobSearch.countryCode}`;
  
    // fetch API for search results
    let results;
    try {
        results = await state.JobSearch.getResults(targetURL);
    } catch {
        alert('Search Error!');
        jobSearchView.stopLoading();
    }

    // remove loading animation
    jobSearchView.stopLoading();

    // add clearbit company data to results & copy to state.results
    await state.JobSearch.addCompanyData(results);          
    
    //convert state.results to iterable array
    let resultsArr = [];

    for (let [key, value] of Object.entries(state.results)) { 
        if (key) { 
            resultsArr.push(value);
        } 
    }
    // console.log('resultsArr');
    // console.log(resultsArr);
    
    // build & render job/s markup
    const resultsStr = resultsArr.map(job =>                 
        jobSearchView.renderJob(jobSearchView.formatJob(job), state.JobSearch.currencySymbol)
    )
    // join array elements/convert to string
    .join('');    

    // add results markup to DOM
    state.JobSearch.resultsContainer.innerHTML = resultsStr;
    state.JobSearch.resultsContainer.style.overflow = "scroll";
    
    // init. search results listeners
    controlSresults();

    // update results nav count
    jobSearchView.updateNavJobCount(elements.resultsNav, state.results);  
}


// run default search to populate search results on page load
controlSearch().then(() => {
    // show preview
    elements.previewHeader.classList.remove('no-display');
    elements.previewBody.classList.remove('no-display');
    //get first key of state.results
    const key = Object.keys(state.results)[0];
    // apply selected class to results nav
    elements.navRowResults.classList.add('selected-nav');
    // update preview with first state.results object
    jobSearchView.updatePreview(state.results[key], '£', elements);
    }
)

// add search/find jobs event listener
state.JobSearch.findBtn.addEventListener('click', e => {
    e.preventDefault();
    // init.
    controlSearch();
});


// =============================================================================
// SEARCH RESULTS CONTROLLER
// =============================================================================

// add search results event listeners
const controlSresults = () => {
    jobSearchView.jobRowListener("results");
    jobSearchView.saveJobBtnListener();
    jobSearchView.archiveBtnListener();
}


// =============================================================================
// NAV CONTROLLER
// =============================================================================

// add navigation event listeners
const controlNav = () => {
    elements.navRows.forEach(row => {
        navView.navRowListener(row);
    })
}
//init.
controlNav();
