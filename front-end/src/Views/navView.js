import JobSearch from '../Models/JobSearch';
import * as jobSearchView from './jobSearchView';
import { elements, domStrings } from './base';



// =============================================================================
// LISTENERS
// =============================================================================

export const navRowListener = row => {
    row.addEventListener('click', e => {
        
        // type must match state obj's name
        let type = e.currentTarget.firstElementChild.textContent
            .split(' ')[0]
            .toLowerCase();

        console.log('type');
        console.log(type);
        
        // add selected board type to DOM
        elements.sresults.board = type;
        
        // clear search results
        jobSearchView.clearSearchResults();

        //TODO: clear preview pane

        // TODO: add laoding saved jobs animation

        let copyArr = [];
        
        for (let [key, value] of Object.entries(state[type])) { 
            if (key) { 
                copyArr.push(value);
            } 
       }
       
       let markup;

        copyArr.map(job => {     
            markup += jobSearchView.renderJob(job, state.JobSearch.currencySymbol, type)
        }).join('');

        if (!markup && type == "results") {
            markup = "No search results!";
        } else if (!markup) {
            markup = `No ${type} jobs!`;
        }


        //TODO: add no jobs HTML markup & w/ styling

        // add saved jobs markup to DOM
        state.JobSearch.resultsContainer.innerHTML = markup.replace(undefined, '');
      
        jobSearchView.jobRowListener(type);
        jobSearchView.saveJobBtnListener();
        jobSearchView.archiveBtnListener();

    })
}