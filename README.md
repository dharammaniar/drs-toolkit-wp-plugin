Plugin that provides functionality and templates for bringing DRS data into WP for the DRS Toolkit.

Should be cloned into wp-content/plugins with
```
  git clone https://github.com/NEU-Libraries/drs-toolkit-wp-plugin.git drs-tk
```
Relies on Javascript being enabled and AJAX - Should work in IE10 and up, Chrome, Firefox, and Safari

[Corresponding theme](https://github.com/NEU-Libraries/drs-toolkit-wp-theme)

### Setup

1. Ask Karl for clean install of WP on correct server (will need to provide a directory name)
2. Log in to new Wordpress site as admin user
3. Install Minamaze theme (go to /wp-admin/theme-install.php and search for minamaze then click install)
4. SSH into correct directory on server and git clone this repo into wp-content/plugins
  ```
    git clone https://github.com/NEU-Libraries/drs-toolkit-wp-plugin.git drs-tk
  ```
5. Also clone the theme into wp-content/themes
  ```
    git clone https://github.com/NEU-Libraries/drs-toolkit-wp-theme.git minamaze-child
  ```
6. Delete extra themes to avoid user confusion
  ```
    cd wp-content/themes
    rm -rf twentyfifteen
    rm -rf twentyfourteen
    rm -rf twentythirteen
  ```
7. Go to /wp-admin/plugins.php in your browser. Activate DRS Toolkit Plugin
8. Go to Settings > Reading and set Front Page Displays to a static page then choose a static page.
9. Go to DRS Toolkit settings and enter collection URL and click Update
10. Go to Appearance > Themes and activate DSG (Minamaze Child Theme)
11. Go to Appearance > Theme Options > Header and enable search then save changes
