testarr = ['2', '2', '3', '4', '5', '2', '3', '2', '5', '6', '7']
testarr = testarr.sort()
log(testarr)
newobj = []
testarr.forEach((num, index, arr) => {
    if (num == arr[index+1]) {
        newobj.push({
            a:index,
            b:index+1
        })
    }
})

log(newobj)