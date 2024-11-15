import qs from "qs";

export const homepagequery = qs.stringify({
    populate: {
        blocks: { 
        on:{
            'layout.hero-section' : {
            populate : {
                image : {
                fields : ['url', 'name', 'alternativeText']
                },
                link : {
                populate : true
                }
            }
            },
            'layout.features-section':{
            populate:{
                feature:{
                populate:true
                }
            }
            }
        }
        }
    }
})