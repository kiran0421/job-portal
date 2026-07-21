function runURLDemo (){
    const api = new URL("https://www.rivisor.com/users?page=1&sort=asc&count=10");
    console.log(api.href, api.hostname, api.protocol, api.pathname, api.searchParams, api.searchParams.get("page"), api.searchParams.get("sort"), api.searchParams.get("count")); 
    api.searchParams.set("page", "2");
    api.searchParams.set("count", "20");
    console.log(api.href);

    const queryparams = new URLSearchParams({
        search: "nodejs",
        page:'1',
        limit: '3'
    })
    console.log(queryparams.toString());
}

runURLDemo();