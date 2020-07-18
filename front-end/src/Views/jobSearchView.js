// import JobSearch from '../Models/JobSearch';
import { elements, elementStrings } from './base';


export const renderJob = (job, currency) => { 
// const { id, title, company, location, salary_max} = job;

//TODO:// assign full job title string to span titie attr

const markup =  `

    <div class="sresults-row data-id=${job.id}">
    <span class="c-logo logo">
        <img src="./imgs/logo-amazon.0689ff3ccc259fd0989fad846adfb4ec.svg" alt="logo">
    </span>
    <div class="pri-row">
        <span class="role">${job.title}</span>
        <span class="salary">${currency}${job.salary_max}</span>                               
    </div>
    <div class="sec-row">
        <div class="company-location"><strong>${job.company.display_name}</strong> ${job.location.area[1]}</div>
    </div>
    <div class="stat-row">
        <span class="btns-row">
            <button class="watch-btn btn" title="Save Job">Save Job</button>
            <button class="note-btn btn" title="Add Note">+ Note</button>
            <button class="archive-btn btn" title="Not Interested">&times</button>
        </span>
        <span class="days">25 days ago</span>
    </div>  
</div>
`;

return markup;

}

export const updatePreview = (job, currency, elements) => {
    const { previewHeader, posted, previewTitle, previewTxt } = elements;

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

const formatTitle = str => {
    let newStr = str.split('')
        .splice(0, 30)
        .join('');
    newStr += "...";
    return newStr;
}

export const formatJob = job => {
    // format job title
    if (job.title) { 
        // remove html markup 
        job.title = job.title.replace(/<\/?[^>]+(>|$)/g, "")
        // create new propery to assign shortened job title - retain full title for job spec @ preview.
        //apply character limit 
        if (job.title.length > 30) {job.title = formatTitle(job.title); }
    }
    
    //format company
    if (job.company.display_name) { 
        // add comma
        job.company.display_name += ",";
    } else {
        job.company.display_name = ""; 
    }
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
    // const markup = `
    // <div class="loading-element hide">
    //     <div class="spinner">
    //         <i class="fas fa-circle-notch"></i>
    //     </div>
    //     <span>Searching...</span>
    // </div>
    // `
    // state.JobSearch.resultsContainer.insertAdjacentHTML('afterbegin', markup);

    
}
export const stopLoading = () => {
    state.JobSearch.loadingElement.classList.add('hide');
}


// row.addEventListener('click', e => {
//     // apply active-row style
//     e.target.classList.toggle("active-row");
// })