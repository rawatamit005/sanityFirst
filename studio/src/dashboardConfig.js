export default {
  widgets: [
    // { name: "structure-menu" },
    /*{
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "6051ebc6ec41917e14fa5e67",
                  title: "Sanity Studio",
                  name: "camp-build-studio",
                  apiId: "d36955f6-2127-4241-a434-d0341fa1a551",
                },
                {
                  buildHookId: "6051ebc6391e9277c136332c",
                  title: "Blog Website",
                  name: "camp-build",
                  apiId: "257b22a0-92fd-480c-bbeb-e0ab0d415ff5",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/ankitrathi1/Camp-Build",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://camp-build.netlify.app",
            category: "apps",
          },
        ],
      },
    },*/
    //{ name: "project-users", layout: { height: "auto" } },
    { name: "create-new-campaign" ,
    layout: { width: "full" },
   },
    {
      name: "document-list",
      options: {
        title: "My Campaigns",
        order: "_createdAt desc",
     
        query: '*[_type == "campaign"]',
        createButtonText: 'Create new Campaign123',
        showCreateButton: false,
       
      },
      layout: { width: "full" },
    },
  ],
};
