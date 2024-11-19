import qs from "qs";

export const summaryquery = qs.stringify({
    populate : '*',
}) //not used till now

export const summarySearchQuery = (queryString : string) => {return qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
        $or: [
        { title: { $containsi: queryString } },
        { summary: { $containsi: queryString } },
        ],
    },
})};