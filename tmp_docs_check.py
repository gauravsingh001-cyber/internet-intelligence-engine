import urllib.request, re
url='https://anakin.ai/docs/'
html=urllib.request.urlopen(url, timeout=30).read().decode('utf-8', 'ignore')
print('LEN', len(html))
for m in re.finditer(r'href="([^"]+)"', html):
    href = m.group(1)
    if 'docs/' in href and ('api' in href.lower() or 'search' in href.lower()):
        print('HREF', href)
