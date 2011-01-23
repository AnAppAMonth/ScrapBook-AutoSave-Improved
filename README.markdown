# ScrapBook AutoSave Improved

The [AutoSave addon][] for [ScrapBook][] (which in turn is a Firefox extension) is a great tool
for recording all one's web browsing experience, making all the information searchable later on.
I used to spend a lot of time trying to search for webpages I visited before but can no longer
remember where, and sometimes I did remember the website but it had evaporated with all the
precious information. By using AutoSave I can make sure such unpleasant things will never happen
to me again.

## Improvements Over AutoSave
Unfortunately, there are several limitations in the AutoSave addon that I have found, which
severely limit its usability, and these are what this improved version tries to address.

*   AutoSave saves ALL pages you open in Firefox, even including password protected pages, or
	pages using HTTPS. These pages often contain sensitive information, and should not be saved.
	In this improved version, I have added a textbox in the options dialog, allowing you to
	specify a regular expression. If the URL of the page matches this RegExp, the page won't be
	saved. For example, you can use the RegExp `^https|[/.]mail\.` to specify that URLs starting
	with `https`, or those containing `mail` as a component in the hostname are not saved.

*   The original AutoSave addon automatically adds a new top-level directory every day and puts
	all pages saved in the day under this directory. These directories add a lot of clutter to
	the directory listing. In this improved version, a top-level directory is created only once
	per month, and the original daily directories are created as sub-directories of these monthly
	directories.

*   Sometimes ScrapBook encounters some problems when capturing a page and will use an alert dialog
	to inform you about the problems. This becomes an annoyance in auto-saving mode as you might
	have to click `OK` multiple times when browsing normally. AutoSave should be a "fire and forget"
	solution that does its work silently in the background, and this improved version achieves this
	by adding a checkbox to the options dialog. Check it, and you won't see those alert dialogs
	again. This is, of course, only for pages auto-saved by this addon. Pages saved manually in
	ScrapBook are not affected.

*   The original AutoSave addon only remembers the last URL saved, and thus if you visit the same
	URL multiple times, but not consecutively, the page will be saved multiple times, too. In this
	improved version, all previously saved URLs in the current browser session are remembered. So
	previously saved pages in the same Firefox window will not be saved again.

To put them in a succinct list, extra features included are:

1.  A regular expression can be specified so that URLs matching it aren't captured.
2.  Captured pages are arranged in two-levels of directories: months and days, instead
	of just days.
3.  Option to suppress error alerts when auto-saving.
4.  URLs already captured in the current browser session aren't captured again.

Of course, these "improvements" are solely based on my own preferences in using AutoSave, you may or
may not like them. But I guess you must be interested enough if you have read this far. :-)

## Where To Get It
Of course you can just grab the source, zip it, rename it to .xpi, and install it in Firefox. But
it's easier to install it via addons.mozilla.org, at the following address:
<https://addons.mozilla.org/en-US/firefox/addon/scrapbook-autosave-improved/>

*You need to have either [ScrapBook][] or [ScrapBook Plus][] installed before installing this addon.
You must also make sure the original AutoSave addon has been uninstalled. Don't enable this addon and
the original AutoSave addon at the same time!*

Last but not least, many well-deserved thanks to Gomita for making available my favorite Firefox
extension: ScrapBook!

[AutoSave addon]: http://amb.vis.ne.jp/mozilla/scrapbook/addons.php?lang=en#AutoSave
[ScrapBook]: https://addons.mozilla.org/en-US/firefox/addon/scrapbook/
[ScrapBook Plus]: https://addons.mozilla.org/en-US/firefox/addon/scrapbook-plus/
