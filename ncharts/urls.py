from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^home/', TemplateView.as_view(template_name="home.html"), name='home'),
    url(r'^charts/multibar/', 'charts.views.multibar', name='multibar'),

    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
