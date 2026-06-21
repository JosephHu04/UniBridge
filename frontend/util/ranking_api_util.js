export const fetchRankings = (params = {}) => {
    const query = new URLSearchParams();
    if (params.region) query.set('region', params.region);
    if (params.year) query.set('year', params.year);
    if (params.search) query.set('search', params.search);
    if (params.limit) query.set('limit', params.limit);
    const qs = query.toString();
    return $.ajax({
        method: 'GET',
        url: `/api/rankings${qs ? '?' + qs : ''}`,
    });
};
