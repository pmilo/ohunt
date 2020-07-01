// import JobSearch from '../Models/JobSearch';
import { elements, elementStrings } from './base';


export const renderJob = (job, currency) => { 
// const { id, title, company, location, salary_max} = job;

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

    // previewHeader.innerHTML
    // previewTitle.innerHTML
    posted.innerHTML = job.created;
    previewTxt.innerHTML = job.description;
    
}

const formatSalary = number => {
    const newNum = Math.round(number / 100) * 100 / 1000;
    const numStr = `${newNum}K`;
    return numStr;
}



export const formatJob = job => {

    // format job title

    //format company
    if (!job.company.display_name) { job.company.display_name = ""; }
    //format location
    if (!job.location.area[1]) { job.location.area[1] = ""; }
    // format salary no.
    job.salary_max = formatSalary(job.salary_max).toString();
 
    return job;
}


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