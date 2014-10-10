# Known Issues

### Apple Iphone / Ipad

- ~~Unwanted blue coloured links in the footer text. UPDATE: fixed with &zwnj; hack.~~

### grunt-premailer

- Premailer strips out some CSS that we want to retain in head (e.g. button :hover styles)

### grunt-processhtml

- When replacing an attribute (e.g. src="blah") in an HTML tag every attribute after the one in question gets deleted. Quick fix is to make sure anything that you want to retain comes before the attribute being replaced.

### Outlook 2007/10/13
- ~~Weird gap between star deal hero image and next row~~
- ~~Weird gap under review stars image (related to hero image gap?)~~
- Images with a link (e.g. star deal hero image) become inverted on click.
- All email text sometimes revert to the default serif as detailed here: (http://www.emailonacid.com/forum/viewthread/183/#788)
- Large gaps on long tables in Outlook 07/10 
see here: (https://www.emailonacid.com/blog/details/C13/horizontal_spacing_issues_in_outlook_2007_and_2010).
possible fix: (http://www.emailonacid.com/blog/details/C13/background_colors_in_html_emails)

### Outlook.com
- Retina images refuse to stay within their containing box on outlook.com when viewed in Internet Explorer if the height and width do not conform to the same ratio as the original image.