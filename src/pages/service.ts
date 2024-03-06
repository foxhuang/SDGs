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

