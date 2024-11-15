import qs from "qs";

export const globaldataquery = qs.stringify(
    {
    populate : {
        header : {
        populate : '*'
        },
        footer : {
        populate : '*'
        }
    }
    }
)

export const globalmetadataquery = qs.stringify({
    fields: ['title', 'description']
})