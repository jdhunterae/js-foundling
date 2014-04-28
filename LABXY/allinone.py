#!/usr/bin/python
"""
Is this the module comment?
Yes, it is.
"""

import os.path

if (not os.path.isfile("out/allinone")):
    OUT_FILE = open("out/allinone.html", "a").close()

OUT_FILE = open("out/allinone.html", "w")

def read_js_file(js_file_name):
    """
    This is the read_file function for javascript files
    """
    OUT_FILE.write("<script>\n")

    js_to_read = open(js_file_name)

    while True:
        line = js_to_read.readline()
        if not line:
            break
        OUT_FILE.write(line)

    OUT_FILE.write("</script>\n")


def get_js_file(script_line):
    """
    This is the function to pull a file path/name out of a script tag
    """
    script_line = script_line[script_line.index("src="):]
    script_line = script_line[(script_line.index("\"") + 1):]
    script_line = script_line[:script_line.index("\"")]

    read_js_file(script_line)


def read_css_file(css_file_name):
    """
    This is the read_file function for javascript files
    """
    OUT_FILE.write("<style>\n")

    css_to_read = open(css_file_name)

    while True:
        line = css_to_read.readline()
        if not line:
            break
        OUT_FILE.write(line)

    OUT_FILE.write("</style>\n")


def get_css_file(link_line):
    """
    This is the function to pull a file path/name out of a link tag
    """
    link_line = link_line[link_line.index("href="):]
    link_line = link_line[(link_line.index("\"") + 1):]
    link_line = link_line[:link_line.index("\"")]

    read_css_file(link_line)


def read_html_file(file_name):
    """
    This is the read_file function for html files
    """
    file_to_read = open(file_name)

    while True:
        line = file_to_read.readline()
        if not line:
            break
        if "<link" in line:
            OUT_FILE.write("<!-- " + line[:-1] + " -->\n")
            get_css_file(line)
        elif "<script" in line:
            OUT_FILE.write("<!-- " + line[:-1] + " -->\n")
            get_js_file(line)
        else:
            OUT_FILE.write(line)


def main():
    """
    This is the main function
    """
    read_html_file("index.html")


if __name__ == "__main__":
    main()
