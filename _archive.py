#!/usr/bin/env python
"""
Recursively zips and packages all LAB?? folders into zip files in
the _archives folder.
"""

import os
import zipfile
from datetime import date

LOG_FILE = open("_archives/log.txt", "w")


def make_archive(file_list, archive_name):
    """
    'file_list' is a list of file names - full path each names
    'archive_name' is the file name for the archive with a full path
    """
    try:
        arc = zipfile.ZipFile(archive_name, "w", zipfile.ZIP_DEFLATED)
        for file_name in file_list:
            LOG_FILE.write("      ARCHIVING: " + file_name + "\n")
            arc.write(file_name)
        arc.close()
        return True
    except:
        return False


def dir_entries(dir_name, subdir, *args):
    """
    'dir_name' folder to list files in.
    'subdir' boolean, if True, includes subdirs, if false, only
    direct child file's are chosen.
    '*args' can be a series of file extensions for exclusive
    inclusion, (.txt, .py will only include those files).
    """
    file_list = []
    for file_name in os.listdir(dir_name):
        dirfile = os.path.join(dir_name, file_name)
        if os.path.isfile(dirfile):
            if not args:
                file_list.append(dirfile)
            else:
                if os.path.splitext(dirfile)[1][1:] in args:
                    file_list.append(dirfile)
        elif os.path.isdir(dirfile) and subdir:
            LOG_FILE.write("    ACESSING: " + dirfile + "\n")
            file_list.extend(dir_entries(dirfile, subdir, *args))
    return file_list


def get_projects():
    """
    Return a list of project folders, excluding the .git and
    _archives folders.
    """
    results = []
    duds = []
    for dir_name, subdir_list, file_list in os.walk("."):
        results.extend(subdir_list)
        break
    for result in results:
        if not "LAB" in result:
            duds.append(result)
    for dud in duds:
        results.pop(results.index(dud))
    return results


def main():
    """
    Main body of the script
    """
    LOG_FILE.write("LAST ARCHIVE: " + str(date.today()) + "\n")
    LOG_FILE.write("========================\n")
    LOG_FILE.write("STARTING ARCHIVE PROCESS...\n")
    LOG_FILE.write("  RETRIEVING PROJECT DIRECTORIES...\n")
    projects = get_projects()
    LOG_FILE.write("  ...DONE\n")

    for project in projects:
        LOG_FILE.write("  RETRIEVING PROJECT DIRECTORIES...\n")
        archive_name = "_archives/" + project + ".zip"
        file_list = dir_entries(project, True)
        make_archive(file_list, archive_name)
        LOG_FILE.write("  ...DONE\n")

    LOG_FILE.write("...DONE\n")

if __name__ == "__main__":
    main()
