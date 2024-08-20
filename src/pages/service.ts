import request from 'umi-request';  

export async function getSDGs() { 
    try {
        const response = await request('../../hysdgs/getSDGs', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function getSDGsBooksById(id?: number) { 
    try {
        const response = await request('../../hysdgs/getSDGsBooksById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

 
export async function getChatGPT(sdgsId?: number,marcId?: number,useAI?: number) { 
    try { 
        const response = await request('../../hysdgs/getChatGPT?sdgsId='+sdgsId+'&marcId='+marcId+'&useAI='+useAI, {
            method: 'GET', 
        }); 
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function getSDGsItemById(id?: number) { 
    try {
        const response = await request('../../hysdgs/getSDGsItemById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function delSDGsItem(id?: number) { 
    try {
        const response = await request('../../hysdgs/delSDGsItem?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}



export async function addSDGsItem(values?: any) { 
    try {
        const response = await request('../../hysdgs/addSDGsItem', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function addSDGsBooks(values?: any) { 
    try {
        const response = await request('../../hysdgs/addSDGsBooks', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function addSDGsKeyword(values?: any) { 
    try {
        const response = await request('../../hysdgs/addSDGsKeyword', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function delSDGsBooksById(id?: number) { 
    try {
        const response = await request('../../hysdgs/delSDGsBooksById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function delSDGsKeyword(id?: number) { 
    try {
        const response = await request('../../hysdgs/delSDGsKeywordById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function getBagM() {
    try {
        const response = await request('../../hysdgs/getBagM', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
} 

export async function getSDGsKeywordById(id?: number) { 
    try {
        const response = await request('../../hysdgs/getSDGsKeywordById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function addSDGsBooksByBagM(bagmId?: number,sdgsId?: number,formSave?: number,formShow?: number) { 
    try {
        const response = await request('../../hysdgs/addSDGsBooksByBagM?bagmId='+bagmId+"&sdgsId="+sdgsId+"&formSave="+formSave+"&formShow="+formShow, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}