# BAT Mail

## Technology stack

### [Ink](http://zurb.com/ink/)
Email framework developed and maintained by [ZURB](http://zurb.com/). This provides the comprehensive cross device and 
client support to ensure that our emails look good for everybody.

### [Sass (Scss)](http://sass-lang.com/)
Sass is a CSS preprocessor that helps us simplify and streamline the styling of our emails through the use of 'mixing' and variables.

### [Handlebars](http://handlebarsjs.com/)
JavaScript templates.

### [Grunt](http://gruntjs.com/)
Grunt is a JavaScript task runner that allows us to automatically perform a number of tasks and operations during the 
build process. Such as:

- [Assemble](http://assemble.io/)  
Compile our templates from modularised page layouts and code partials.  
Include external [Markdown](http://daringfireball.net/projects/markdown/) files to provide mock content

- [Nodemailer](https://github.com/andris9/Nodemailer)  
Generate instant test emails during the development process

- CSS Inline  
Automatically 'inline' our CSS, so that it works across all email clients   

- ProcessHTML  
Strip out and replace mock content with dynamic variables used by the EEMS grid system.

## Dev folder structure

	- src
	-- templates
	--- layouts
	--- pages
	--- partials
	---content-modules
	
### Layouts
A ```layout``` defines the headers, footers, branding and theme to be used for any given email. A ```layout``` is defined within each ```page```.

### Pages
```Pages``` are the main email templates and there will be a ```page``` created for each email type or version. Each ```page``` defines a surrounding ```layout```, the content layout and the specific ```content-modules``` that will be used.

### Partials
A ```partial``` is a reusable HTML code snippet.  
Some ```partials``` will define specific content, or group of related content, and these will be referred to a ```content-modules```.

### Content modules
A ```content-module``` is a type of ```partial``` that defines some content (oh yes it does).   
A ```content-module``` may represent a single piece of content, or may be a group of nested ```content-modules``` or ```partials``` that together form the ```content-module```.







