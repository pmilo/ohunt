// import JobSearch from '../Models/JobSearch';
import { elements, domStrings } from './base';
import * as jobSearchView from './jobSearchView';
import * as navView from './navView';

//TODO: remove remove job row when unsaving with preview or jrow save btns

//TODO: create render tool-tip overlay function for job boards to highlight purpose/function. 


export const renderJob = (job, currency, type) => { 
    // const { id, title, company, location, salary_max} = job;
    
    //TODO: assign full job title string to span titie attr - func
    
    const jobMatch = state.JobSearch.getJob(state.saved, job.id);
    const archivedJob = state.JobSearch.getJob(state.archived, job.id);
    
    let markup =  `
    
    <div class="sresults-row" data-id=${job.id}>
    <span class="c-logo logo">
    <img src="${job.logo ? job.logo : 'imgs/ohunt-logo2.8b89ae493ac6525c8a06fd4fe23106c1.png' }" alt="logo">
    </span>
    <div class="pri-row">
    <span class="role">${job.title}</span>
    <span class="salary">${currency}${job.salary_max}</span>                               
    </div>
    
    <div class="company-location">${job.company.display_name ? '<strong>' + job.company.display_name + '</strong>' : 'Company not specified'}</div>
    <div class="location-row">${job.location.area[1] ? job.location.area[1] : 'Location not specified'}</div>
    
    <div class="stat-row">
    <span class="btns-row">
    <button class="watch-btn btn ${jobMatch ? 'selected' : ''}" title="Save Job"> ${jobMatch ? 'Saved' : 'Save Job'}</button>
    <button class="note-btn btn" title="Add Note">+ Note</button>
    <button class="archive-btn btn ${archivedJob ? 'selected' : ''}" title="Not Interested">&times</button>
    </span>
    <span class="days">${calcDaysAgo(job.created)}</span>
    </div>  
    </div>
    `;
      
    // don't render to results board if job is archived
    if (archivedJob && type === "results") { 
        markup = "";
    }

    return markup
        
}
    
    //TODO: create preview render function to clear/reinstate preview pane when switching job boards - this will resolve bug with savebtn listener 
    
    export const removeJobRow = id => {
        let element = document.querySelector(`[data-id="${id}"]`);

        if (!element.classList.contains('preview-header')) {
            element.remove();
        }
    }

    export const updatePreview = (job, currency, elements) => {
        const { previewHeader, posted, previewTitle, previewLocation, previewCompany, previewLogo, previewTxt, viewBtnHref } = elements;
        const { company, location, logo, title, created, description, redirect_url } = job;
        
        const isSaved = state.JobSearch.getJob(state.saved, job.id);
        const isArchived = state.JobSearch.getJob(state.archived, job.id);
        
        if (isSaved) {
            elements.previewSaveBtn.textContent = "Saved";
            elements.previewSaveBtn.classList.add("selected");
        } else {
            elements.previewSaveBtn.textContent = "Save Job";
            elements.previewSaveBtn.classList.remove("selected");
        }

        if (isArchived) {
            elements.previewArchiveBtn.classList.add("selected");
        } else {
            elements.previewArchiveBtn.classList.remove("selected");
        }
        
    previewHeader.dataset.id = job.id;
    
    previewTitle.innerHTML = title;
    previewCompany.innerHTML = `${company.display_name ? company.display_name : 'Company not specified' }`;
    previewLogo.src = `${logo ? logo : "imgs/ohunt-logo2.8b89ae493ac6525c8a06fd4fe23106c1.png"}`;
    previewLocation.innerHTML = ` – ${location.area[1]}`
    posted.innerHTML = calcDaysAgo(created);
    previewTxt.innerHTML = description;
    viewBtnHref.href = redirect_url;
    
    
}

const calcDaysAgo = datePosted => {
    //split date str
    const [ year, month, day ] = datePosted.split('-');
    let start = new Date(`${month} ${day}, ${year}`),
        end = new Date(), //current date
        days = 1000 * 60 * 60 *24,
        diff = end - start,
        result = Math.floor(diff / days);

    const posted = `${result < 1 ? 'Today' : result + ' days ago' }`;
    return posted;
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

const formatCreated = date => {
    const dateStr = date.split('T')[0];
    return dateStr;
}

export const formatJob = job => {

    // format job title
    const charLimit = 27;
    if (job.title) { 
        // remove html markup 
        job.title = job.title.replace(/<\/?[^>]+(>|$)/g, "")
        
        //TODO: create new propery to assign shortened job title - retain full title for job spec @ preview.

        //apply character limit 
        if (job.title.length > charLimit) {job.title = formatTitle(job.title, charLimit); }
    }
    
    //format company
    // if (job.company.display_name) { 
    //     // add comma
    //     job.company.display_name += ",";
    // } else {
    //     job.company.display_name = ""; 
    // }

    //format location
    if (!job.location.area[1]) { job.location.area[1] = ""; }
    // format salary no.
    job.salary_max = formatSalary(job.salary_max).toString();

    //format date posted
    job.created = formatCreated(job.created);

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
    

export const saveJobBtnListener = type => {
    
    //TODO: resolve inconsistencies with preview save job function.

    const saveBtns = [...document.querySelectorAll(domStrings.saveBtns)];
    // add preview save btn to saveBtns array
    saveBtns.push(elements.previewSaveBtn);
    
    saveBtns.forEach(btn => {
        //attach listener
        btn.addEventListener('click', e => {
            e.stopPropagation();

            let id, saveBtnType;

            // get job id from dom dataset attr
            if (btn.classList.contains('saved-preview-btn')) {

                let el = document.querySelector(domStrings.previewHeader);
                id = el.dataset.id;
                saveBtnType = "preview";
                console.log('preview id');
                console.log(id);
            } else {
                // get id from job row dataset
                id = e.currentTarget.offsetParent.dataset.id;
                saveBtnType = "row";
                console.log('job row id');
                console.log(id);
            }

            //look for selected job in state.results & return
            const jobMatch = state.JobSearch.getJob(state.results, id);
            //look for selected job in state.saved & return
            const savedJob = state.JobSearch.getJob(state.saved, id);

            const previewID = document.querySelector('.preview-header');

            if (!savedJob) {
                // add job to state
                state.JobSearch.addJob(jobMatch, id, "saved");
                //update nav saved job count
                updateNavJobCount(elements.savedJobsNav, state.saved);

                // add e.currentTarget selected styling
                e.currentTarget.textContent = "Saved";
                e.currentTarget.classList.add("selected");

                //remove job row save btn styling if preview save btn used
                if (saveBtnType === "preview") { 
                    document.querySelector(`[data-id="${id}"] .watch-btn`).classList.add("selected"); 
                    document.querySelector(`[data-id="${id}"] .watch-btn`).textContent = "Saved";

                } else if (saveBtnType === "row") {
                    // update preview btn class

                    //check if job id matches preview dataset.id before styling preview btn
                    if (id === previewID.dataset.id) {
                        elements.previewSaveBtn.classList.add("selected");
                        elements.previewSaveBtn.textContent = "Saved";
                    }
                }

                // add selected class
            } else if (savedJob.id) {
            
                // remove job from state
                state.JobSearch.deleteJob(savedJob, id, "saved");

                if (elements.sresults.board === "saved") { removeJobRow(id); };

                //update nav job count
                updateNavJobCount(elements.savedJobsNav, state.saved);

                // remove e.currentTarget selected styling
                e.currentTarget.textContent = "Save Job";
                e.currentTarget.classList.remove("selected");

                //remove job row save btn styling if preview save btn used
                if (saveBtnType === "preview") { 
                    document.querySelector(`[data-id="${id}"] .watch-btn`).classList.remove("selected"); 
                    document.querySelector(`[data-id="${id}"] .watch-btn`).textContent = "Save Job";   
                } else if (saveBtnType === "row") {
                    if (id === previewID.dataset.id) {  
                        elements.previewSaveBtn.classList.remove("selected");
                        elements.previewSaveBtn.textContent = "Save Job";
                    }
                }
            }
        }, true);
    })    
};




export const archiveBtnListener = () => {
    const archiveBtns = [...document.querySelectorAll(domStrings.archiveBtns)];
    
    // add preview archive btn to array
    archiveBtns.push(elements.previewArchiveBtn);
    
    // attach listeners to all archive btns
    archiveBtns.forEach(btn =>{
        btn.addEventListener('click', e => {
            e.stopPropagation();
            
            let id, preview;
            
            // define btn type
            preview = btn.classList.contains('archive-preview-btn');
            
            if (preview) {
                id = document.querySelector(domStrings.previewHeader).dataset.id;
            } else if (!preview) {
                id = e.currentTarget.offsetParent.dataset.id;
            }
            
            // get selected job from state.results
            const job = state.JobSearch.getJob(state.results, id);
            const archivedJob = state.JobSearch.getJob(state.archived, id);

            if (!archivedJob) {
                // add job to state.archived
                state.JobSearch.addJob(job, id, "archived");

                // remove job from DOM;
                removeJobRow(id);

                // remove job from state.results;
                // state.JobSearch.deleteJob(job, id, "results");

                // get job if saved
                const savedJob = state.JobSearch.getJob(state.saved, id);
                
                if (savedJob) {
                    // remove job from state.saved
                    state.JobSearch.deleteJob(savedJob, id, "saved");
                    //update saved nav count
                    updateNavJobCount(elements.savedJobsNav, state.saved);
                }

                // update archived nav job count
                updateNavJobCount(elements.archivedNav, state.archived);

                
            } else if (archivedJob.id) {

                // remove job from state.archived
                state.JobSearch.deleteJob(archivedJob, id, "archived");

                if (elements.sresults.board === "saved") {
                    // remove archive btn selected styling
                    e.currentTarget.classList.remove("selected");    
                } else {
                    // remove job row (from archived board)
                    removeJobRow(id);
                }

                // update archived nav count
                updateNavJobCount(elements.archivedNav, state.archived);
            }       
        })
    })  

};