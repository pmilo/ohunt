import "./styles.css";

import JobSearch from './Models/JobSearch';
import * as jobSearchView from './Views/jobSearchView';
import * as navView from './Views/navView';
import { elements, domStrings } from './Views/base';


//TODO: Indeed job search API integration / Adzuna plan upgrade

//TODO: add default occuhunt logo for unsucessfull company/logo clearbit match

//TODO: redesign job preview pane

//TODO: add tool tip for job boards w/ option to ok/x/remove - remember interaction; copy to state/local storage: { state.board - tool_tip: true/false }

//TODO: wrap all listner functions into one func to invoke when rendering job rows

//TODO: create add to job obj & add state/local storage click event for +note btns

//TODO: finish sresults job formatting

//TODO: remove archived jobs from state.results before rendering @findbtn listener

//TODO: push input search criteria to state with a unique id




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
    jobSearchView.updateNavJobCount(elements.archivedNav, state.archived);
});



// =============================================================================
// SEARCH CONTROLLER
// =============================================================================

state.JobSearch = new JobSearch('#search-form', '.search-results', '.loading-element', '.search-btn');

// set country code
state.JobSearch.setCountryCode();

// add search listener

const controlSearch = async ()  => {

    //TODO: clear preview pane

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

    // add clearbit company data to results & copy to state.results.
    await state.JobSearch.addCompanyData(results);          
    
    //convert state.results to iterable array
    let resultsArr = [];

    for (let [key, value] of Object.entries(state.results)) { 
        if (key) { 
            // console.log('value');
            // console.log(value);
            resultsArr.push(value);
        } 
    }
    console.log('resultsArr');
    console.log(resultsArr);
    
    // build & render job(s) markup
    const resultsStr = resultsArr.map(job =>                 
        jobSearchView.renderJob(jobSearchView.formatJob(job), state.JobSearch.currencySymbol)
    )
    // join array elements/convert to string
    .join('');    

    // add results markup to DOM
    state.JobSearch.resultsContainer.innerHTML = resultsStr;
    state.JobSearch.resultsContainer.style.overflow = "scroll";
    
    // add search results listeners
    controlSresults();

    // update results nav count
    jobSearchView.updateNavJobCount(elements.resultsNav, state.results);

    // if error, stop loading animation    
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
    jobSearchView.archiveBtnListener();
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


