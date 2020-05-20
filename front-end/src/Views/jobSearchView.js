import JobSearch from '../Models/JobSearch';
import * as jobSearchView from '../Views/jobSearchView';


export const renderJob = (job, currency) => { 
const markup =  `
    <div class="sresults-row data-id="${job.id}">
        <div class="sresults-col-1 sresults-col">
            <div class="c-logo">
                <img src="./src/assets/logo-amazon.svg" alt="logo">
            </div>
        </div>
        <div class="sresults-col-2 sresults-col">
            <div class="company">${job.company.display_name}</div>
            <span class="fav-icon"><img src="./src/assets/fav-heart.png"></span>
            <div class="role">${job.title}</div>
            <div class="location">${job.location.display_name}</div>
        </div>
    </div>
`;

return markup;

console.log('job:');
console.log(job);

}


// export const addFindBtnListener = btn => {
//     btn.addEventListener('click', e => {
//         // prevent page reload
//         event.preventDefault();
//         // clear search resukts
//         jobSearchView.clearSearchResults();
        
//         // get search & location input field values
//         const { search, location } = state.JobSearch.extractFormData(state.JobSearch.searchForm);
//         // build url 
//         const targetURL = `http://localhost:5000/?search=${search}&location=${location}&country=${state.JobSearch.countryCode}`;
//         console.log('targetURL:');
//         console.log(targetURL);
        
//         // query API with url with fetch using api server address (localhost)
//         fetch(`http://localhost:5000/?search=${search}&location=${location}&country=${state.JobSearch.countryCode}`)
//             .then(response => response.json())
//             .then(({ results }) => {

//                 console.log('results:');
//                 console.log(results);

//                 // remove loading animation
//                 jobSearchView.stopLoading();
//                 return results
//                     // for each results object, run renderJob(); 
//                     .map(job => renderJob(job, this.currencySymbol))
//                     .join('')
//             })
//             // update DOM with results
//             .then(jobs => this.resultsContainer.innerHTML = jobs)
//             // if error, stop loading animation
//             .catch(() => jobSearchView.stopLoading());
//     });
    
// }

export const clearSearchResults = () => {
    state.JobSearch.resultsContainer.innerHTML = "";
};

export const startLoading = () => {
    state.JobSearch.loadingElement.classList.remove('hide');
}
export const stopLoading = () => {
    state.JobSearch.loadingElement.classList.add('hide');
}


// row.addEventListener('click', e => {
//     // apply active-row style
//     e.target.classList.toggle("active-row");
// })