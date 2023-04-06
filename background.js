chrome.action.onClicked.addListener(async () => {
  let queryOptions = {active: true, lastFocusedWindow: true}
  const [currentTab] = await chrome.tabs.query(queryOptions)
  if (!currentTab) return

  const originURL = currentTab.url
  const URLObj = new URL(originURL)
  const tabId = currentTab.id
  const cleancacheUrl = `${URLObj.origin}/cleancache`

  goCleanCache(tabId, cleancacheUrl, originURL)
})

const goCleanCache = (tabId, url, originURL) => {
  chrome.tabs.update(tabId, {url}, () => goBack(tabId, originURL))
}

const goBack = (tabId, originURL) => {
  setTimeout(() => {
    chrome.tabs.update(tabId, {url: originURL})
  }, 2000)
}
