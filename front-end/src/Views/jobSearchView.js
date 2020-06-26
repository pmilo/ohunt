// import JobSearch from '../Models/JobSearch';
import { elements, elementStrings } from './base';


export const renderJob = (job, currency) => { 
const markup =  `

    <div class="sresults-row" data-id=${job.id}>
    <div class="sresults-col-1 sresults-col">
        <div class="c-logo">
            <img src="./imgs/logo-amazon.0689ff3ccc259fd0989fad846adfb4ec.svg" alt="logo">
        </div>
    </div>
    <div class="sresults-col-2 sresults-col">
        <div class="status"><i class="fas fa-binoculars"></i><i class="fas fa-fire-alt"></i></div>
        <div class="role"><span>${job.title}</span></div>
        <div class="company-location"><strong>${job.company.display_name}</strong>, ${job.location.area[1]}</div>
        <div class="salary">${currency}${job.salary_max}</div>                               
    </div>
    </div>

`;

return markup;

}

export const updatePreview = (job, currency, elements) => {
    const { previewHeader, posted, previewTitle, previewTxt } = elements;
    const markup = `
    <div class="preview-header">
        <span class="i-wrapper"><i class="fas fa-binoculars"></i></span>
        <span class="i-wrapper"><i class="fas fa-fire-alt"></i></span>
    </div>
    <div class="posted">${job.created}</div>
    <div class="preview-body">
        <h1 class="preview-title">Job Summary</h1>
        <p class="preview-txt>${job.description}</p>
    </div> 
    `
    // return markup;

    // previewHeader.innerText 
    posted.innerText = job.created;
    // previewTitle.innerText = job.
    previewTxt.innerHTML = job.description;
    
}


export const formatJob = job => {
    // format job title
    // format location
    // format salary no.
}


const calcDays = (currDate, datePosted) => {
    // TODO: write calc days ago function
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