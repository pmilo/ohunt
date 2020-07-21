// import JobSearch from '../Models/JobSearch';
import { elements, elementStrings } from './base';


export const renderJob = (job, currency) => { 
// const { id, title, company, location, salary_max} = job;

//TODO:// assign full job title string to span titie attr

const markup =  `

    <div class="sresults-row" data-id=${job.id}>
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
    //TODO: add job.dataset.id to preview element (use dataset attr or add to DOM as 'Ref:')
    const { previewHeader, posted, previewTitle, previewLocation, previewCompany, previewTxt } = elements;
    const { company, location, title, created, description } = job;

    // previewHeader.innerHTML
    previewTitle.innerHTML = title;
    previewCompany.innerHTML = company.display_name;
    previewLocation.innerHTML = location.area[1];
    posted.innerHTML = created;
    previewTxt.innerHTML = description;
    
}

const formatSalary = number => {
    const newNum = Math.round(number / 100) * 100 / 1000;
    const numStr = `${newNum}K`;
    return numStr;
}

const formatTitle = (str, limit) => {
    //convert to array
    let newStr = str.split('')
        // return characters between 0-27 index
        .splice(0, limit)
        // convert array to string
        .join('');
        //append elipsis
    newStr += "...";

    return newStr;
}

export const formatJob = job => {
    // format job title
    const charLimit = 27;
    if (job.title) { 
        // remove html markup 
        job.title = job.title.replace(/<\/?[^>]+(>|$)/g, "")
        // create new propery to assign shortened job title - retain full title for job spec @ preview.
        //apply character limit 
        if (job.title.length > charLimit) {job.title = formatTitle(job.title, charLimit); }
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
    
}
export const stopLoading = () => {
    state.JobSearch.loadingElement.classList.add('hide');
}


//TODO: create update nav count func - call in add/delete job funcs.
        // find a way to find obj.length to get job count

export const updateNavJobCount = (domCount, stateObj) => {
    const count = Object.keys(stateObj).length;
    if (count < 1) {
        domCount.textContent = " ";   
    } else {
        domCount.textContent = Object.keys(stateObj).length;
    }
}


//TODO: create function to check job status and apply btn styling if job is found in state.saved

// -----------------------------------------------------------------------------
// DOM LISTENERS
// -----------------------------------------------------------------------------

export const saveJobBtnListen = btn => {
    //attach listener
    btn.addEventListener('click', e => {
        // get job id from dom dataset attr
        const id = e.currentTarget.offsetParent.dataset.id;
        //get job from sresults with id
        const jobMatch = state.JobSearch.getJob(state.results, id)
        // check if job id is in state.saved
        if (!state.JobSearch.getJob(state.saved, id)) {
            // add job to state
            state.JobSearch.addJob(jobMatch, id, state.saved);
            //update nav job count
            updateNavJobCount(elements.savedJobsNav, state.saved);
        } else {
            // remove job from state
            state.JobSearch.deleteJob(jobMatch, id, state.saved);
            //update nav job count
            updateNavJobCount(elements.savedJobsNav, state.saved);
        }
    })

    // SAVE JOB
    
    //func: 
    // get sresults-row data-id value
    //func:
    // use data id to look for job in state.results; `job$-{id}`
    // push matching state.results obj to state.savedJobs
    // update nav count
    
    //func:
    // stringify/convert obj to json (?)
    // add to local storage
    
    
    //on page load - func:
    // copy localStorage to state
    //
};