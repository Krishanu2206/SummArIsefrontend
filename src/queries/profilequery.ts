import qs from "qs";

export const queryforupdateprofile = qs.stringify({
    populate : '*'
}) //not used anywhere in the code

export const currentUserProfileQuery= qs.stringify({
    populate: {
        image : {
            fields : ['url', 'alternativeText']
        }
    }
});