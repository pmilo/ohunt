// import JobSearch from '../Models/JobSearch';
import { elements, domStrings } from './base';
import * as jobSearchView from './jobSearchView';
import * as navView from './navView';


export const renderJob = (job, currency, type) => { 
// const { id, title, company, location, salary_max} = job;

//TODO: assign full job title string to span titie attr - func

const jobMatch = state.JobSearch.getJob(state.saved, job.id);

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
            <button class="watch-btn btn ${jobMatch ? 'selected' : ''}" title="Save Job"> ${jobMatch ? 'Saved' : 'Save Job'}</button>
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
    const { previewHeader, posted, previewTitle, previewLocation, previewCompany, previewTxt } = elements;
    const { company, location, title, created, description } = job;

    const isSaved = state.JobSearch.getJob(state.saved, job.id);
    
    if (isSaved) {
        elements.previewSaveBtn.textContent = "Saved";
        elements.previewSaveBtn.classList.add("selected");
    } else {
        elements.previewSaveBtn.textContent = "Save Job";
        elements.previewSaveBtn.classList.remove("selected");
    }

    previewHeader.dataset.id = job.id;

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

//TODO: create clear/default view preview func - add to innerHTML; invoke when switching job boards


export const clearSearchResults = () => {
    state.JobSearch.resultsContainer.innerHTML = "";
};

export const startLoading = () => {
    state.JobSearch.loadingElement.classList.remove('hide');
    
};
export const stopLoading = () => {
    state.JobSearch.loadingElement.classList.add('hide');
};

export const updateNavJobCount = (domCount, stateObj) => {
    const count = Object.keys(stateObj).length;
    if (count < 1) {
        domCount.textContent = " ";   
    } else {
        domCount.textContent = Object.keys(stateObj).length;
    }
};

export const addClass = (el, cla) => {
    // el.classList.add(class);
    console.log('test')
};


//TODO: add job status properties to job obj data i.e saved: true, note: false, archived: false
//TODO: create function to check job status and apply btn styling if job is found in state.saved    

// export const renderJobStatus = (job, type) => {
//     switch(job) {
//         case job.saved:
//             // update job element
//             continue;
//         case job.arhived:
//             // update job element
//             continue;
//         case job.applied:
//             // update job element
//             continue;
//     }
// }

// -----------------------------------------------------------------------------
// SRESULTS LISTENERS
// -----------------------------------------------------------------------------

export const jobRowListener = (type) => {
    // convert sresults to array
    const sresults = [...document.querySelectorAll(domStrings.sresultsRow)];

    // add listeners to rendered job rows
    sresults.forEach(jobRow => {
        jobRow.addEventListener('click', e => {
            const matchedJob = state.JobSearch.getJob(state[type], e.currentTarget.dataset.id);                
            jobSearchView.updatePreview(matchedJob, '£', elements);
        });
    });
}
    

export const saveJobBtnListener = btn => {
    //TODO: resolve inconsistencies with preview save job function.

    const saveBtns = [...document.querySelectorAll(domStrings.saveBtns)];
    // add preview save btn to saveBtns array
    saveBtns.push(elements.previewSaveBtn);
    console.log('saveBtns');
    console.log(saveBtns);

    saveBtns.forEach(btn => {
        //attach listener
        btn.addEventListener('click', e => {
            e.stopPropagation();

            let el = document.querySelector(domStrings.previewHeader);
            let id;

            // get job id from dom dataset attr
            if (btn.classList.contains('saved-preview')) {
                id = el.dataset.id;
                console.log('preview id');
                console.log(id);
            } else {
                // get id from job row dataset
                id = e.currentTarget.offsetParent.dataset.id;
                console.log('job row id');
                console.log(id);
            }

            //get job from sresults with id
            const jobMatch = state.JobSearch.getJob(state.results, id)
            console.log('jobMatch');
            console.log(jobMatch);

            // check if job id is in state.saved
            if (!state.JobSearch.getJob(state.saved, id)) {
                // add job to state
                state.JobSearch.addJob(jobMatch, id, "saved");
                //update nav job count
                updateNavJobCount(elements.savedJobsNav, state.saved);
                // toggle selectd styling
                e.currentTarget.textContent = "Saved";
                e.currentTarget.classList.toggle("selected");
            } else {
                // remove job from state
                state.JobSearch.deleteJob(jobMatch, id, "saved");

                //TODO: remove job from dom to resolve bug when previewing job after unsaving.

                //update nav job count
                updateNavJobCount(elements.savedJobsNav, state.saved);
                // toggle selected styling
                e.currentTarget.textContent = "Save Job";
                e.currentTarget.classList.toggle("selected");
            }
        }, true);
    })


    //TODO: set up archived listener

};