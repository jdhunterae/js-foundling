#!/usr/bin/python
"""
Is this the module comment?
Yes, it is.
"""

import sys, getopt, os.path


def read_js_file(js_file_name, out_file):
    """
    This is the read_file function for javascript files
    """
    out_file.write("<script type=\"text/javascript\">\n")

    js_to_read = open(js_file_name)

    while True:
        line = js_to_read.readline()
        if not line:
            break
        out_file.write(line)

    out_file.write("</script>\n")


def get_js_file(script_line, out_file):
    """
    This is the function to pull a file path/name out of a script tag
    """
    script_line = script_line[script_line.index("src="):]
    script_line = script_line[(script_line.index("\"") + 1):]
    script_line = script_line[:script_line.index("\"")]

    read_js_file(script_line, out_file)


def read_css_file(css_file_name, out_file):
    """
    This is the read_file function for javascript files
    """
    out_file.write("<style type=\"text/css\">\n")

    css_to_read = open(css_file_name)

    while True:
        line = css_to_read.readline()
        if not line:
            break
        out_file.write(line)

    out_file.write("</style>\n")


def get_css_file(link_line, out_file):
    """
    This is the function to pull a file path/name out of a link tag
    """
    link_line = link_line[link_line.index("href="):]
    link_line = link_line[(link_line.index("\"") + 1):]
    link_line = link_line[:link_line.index("\"")]

    read_css_file(link_line, out_file)


def read_html_file(in_file, out_file):
    """
    This is the read_file function for html files
    """
    file_to_read = open(in_file)
    out_file = open(out_file, "w")

    while True:
        line = file_to_read.readline()
        if not line:
            break
        if "<link" in line:
            out_file.write("<!-- " + line[:-1] + " -->\n")
            get_css_file(line, out_file)
        elif "<script" in line:
            out_file.write("<!-- " + line[:-1] + " -->\n")
            get_js_file(line, out_file)
        else:
            out_file.write(line)


def main(cline_args):
    """
    This is the main function
    """
    in_file = ""
    out_file = ""

    try:
        opts, args = getopt.getopt(cline_args, "hi:o:", ["ifile=", "ofile="])
    except getopt.GetoptError:
        print "allinone.py -i <inputfile> -o <outputfile>"
        sys.exit(2)

    for opt, arg in opts:
        if opt == "-h":
            print "allinone.py -i <inputfile> -o <outputfile>"
            sys.exit()
        elif opt in ("-i", "-ifile"):
            in_file = arg
        elif opt in ("-o", "-ofile"):
            out_file = arg

    if not in_file:
        in_file = "index.html"
    if not out_file:
        out_file = "out/allinone.html"
    
    read_html_file(in_file, out_file)
    

if __name__ == "__main__":
    main(sys.argv[1:])
