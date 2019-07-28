// arr = [{lat, lng}]
function getBestSequence(arr)
{
    let url = 'https://wse.api.here.com/2/findsequence.json';
    url += `?start=${arr[0].lat},${arr[0].lng}`;
    for (let i = 1; i < arr.length - 1; i++)
    {
        url += `&destination${i}=${arr[i].lat},${arr[i].lng}`;
    }
    url += `&end=${arr[arr.length - 1].lat},${arr[arr.length - 1].lng}`;
    url += `&mode=fastest;car&app_id=kyFZFwVFLPltWgWPeHqg&app_code=p_KQvPzRD083Mp-GiN8VkQ`;
    console.log(url);

    return fetch(url).then(res => res.json());
}

export default getBestSequence;