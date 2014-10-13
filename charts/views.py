from django.shortcuts import render_to_response
from ncharts.settings import MEDIA_ROOT


def multibar(request):
    """
    multibarchart page
    """
    nb_element = 10
    table = open(MEDIA_ROOT + '/xtab2x.htm')
    yname = []
    xdata = []
    ydata = []
    for line in table:
        if line[:8] == '<tr><th>':
            line = line[17:]
            while line.find('</t') > 0:
                x = line.find('</t')
                s = line[:x]
                yname.append(s)
                line = line[x+9:]
        i = 0
        while i < len(yname):
            ydata.append([])
            i += 1
        if line[:8] == '<tr><td>':
            line = line[8:]
            i = 0
            while line.find('</t') > 0:
                x = line.find('</t')
                s = line[:x]
                if i == 0:
                    xdata.append(s)
                else:
                    ydata[i].append(s)
                line = line[x+9:]
                i += 1
    extra_serie = {"tooltip": {"y_start": "There are ", "y_end": " calls"}}
    chartdata = {
        'x': xdata,
        'name1': yname[0], 'y1': ydata[1], 'extra1': extra_serie,
        'name2': yname[1], 'y2': ydata[2], 'extra2': extra_serie,
        'name3': yname[2], 'y3': ydata[3], 'extra3': extra_serie,
        'name4': yname[3], 'y4': ydata[4], 'extra4': extra_serie,
        'name5': yname[4], 'y5': ydata[5], 'extra5': extra_serie
    }
    print 'xdata = ', xdata
    print 'yname = ', yname
    print 'ydata = ', ydata
    charttype = "multiBarChart"
    chartcontainer = 'multibarchart_container' # container name
    chartcontainer_with_date = 'date_multibarchart_container' # container name
    data = {
        'charttype': charttype,
        'chartdata': chartdata,
        'chartcontainer': chartcontainer,
        'extra': {
            'x_is_date': False,
            'x_axis_format': '',
            'tag_script_js': True,
            'jquery_on_ready': True,
        },
    }
    return render_to_response('charts/multibar.html', data)

# Create your views here.
