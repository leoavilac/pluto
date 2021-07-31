// SPDX-License-Identifier: GPL-2.0
#include <linux/fs.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/mm.h>
#include <linux/hugetlb.h>
#include <linux/mman.h>
#include <linux/mmzone.h>
#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/swap.h>
#include <linux/vmstat.h>
#include <linux/atomic.h>
#include <linux/vmalloc.h>
#include <asm/page.h>
#include <asm/pgtable.h>
#include <asm/uaccess.h>

#define FileProc "201213255_ram"

MODULE_AUTHOR("Leonel Avila");
MODULE_DESCRIPTION("SOPES 1");
MODULE_LICENSE("GPL");

struct sysinfo i;

unsigned long committed;
unsigned long allowed;
long cached;
unsigned long pages[NR_LRU_LISTS];
int lru;

static int show_memory_stat(struct seq_file *f, void *v){
    si_meminfo(&i);
	
    // seq_printf(f,"%lu\n",((i.freeram*100)/i.totalram));
    seq_printf(f,"{\n");
    seq_printf(f,"\"total\":" "%lu,\n", ((i.totalram) << (PAGE_SHIFT -10))/1024 );
    seq_printf(f,"\"free\":" "%lu,\n",( (i.freeram) << (PAGE_SHIFT -10) ) /1024);
    seq_printf(f,"\"used\":" "%lu,\n",(  ( ( ( (i.totalram) << (PAGE_SHIFT -10) )  -  ( (i.freeram) << (PAGE_SHIFT -10) ) )*4) /1024 ) );
    seq_printf(f,"\"percent\":" "%lu\n",(  (( ( ( (i.totalram) << (PAGE_SHIFT -10) )  -  ( (i.freeram) << (PAGE_SHIFT -10) ) )*4) /1024 )/100 ));
    
    seq_printf(f,"}\n");
    return 0;
}

static int meminfo_proc_open(struct inode *inode, struct file*file){
    return single_open(file,show_memory_stat, NULL);
}

static const struct file_operations Meminfo_fops = {
    .owner = THIS_MODULE,
    .open = meminfo_proc_open,
    .read = seq_read,
    .llseek  = seq_lseek,
	.release = seq_release
};


static int __init start_function(void){
    printk(KERN_INFO "Modulo RAM cargado");
    proc_create (FileProc, 0777, NULL, &Meminfo_fops);
	printk(KERN_INFO "Archivo Creado: /proc/%s\n",FileProc);
	return 0;
}

static void __exit clean_function(void){
    printk(KERN_INFO "Modulo RAM eliminado");
    remove_proc_entry(FileProc, NULL);
}

module_init(start_function);
module_exit(clean_function);
