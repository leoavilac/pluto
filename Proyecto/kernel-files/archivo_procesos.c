#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/uaccess.h>
#include <linux/slab.h>
#include <linux/fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/mm.h>
#include <linux/swap.h>
#include <linux/sched/cputime.h>
#include <linux/cpumask.h>
#include <linux/interrupt.h>
#include <linux/kernel_stat.h>
#include <linux/time.h>
#include <linux/irqnr.h>
#include <linux/tick.h>


#ifndef arch_irq_stat_cpu
#define arch_irq_stat_cpu(cpu) 0
#endif
#ifndef arch_irq_stat
#define arch_irq_stat() 0
#endif

#ifdef arch_idle_time
static cputime64_t get_idle_time(int cpu)
{
	cputime64_t idle;

	idle = kcpustat_cpu(cpu).cpustat[CPUTIME_IDLE];
	if (cpu_online(cpu) && !nr_iowait_cpu(cpu))
		idle += arch_idle_time(cpu);
	return idle;
}

static cputime64_t get_iowait_time(int cpu)
{
	cputime64_t iowait;

	iowait = kcpustat_cpu(cpu).cpustat[CPUTIME_IOWAIT];
	if (cpu_online(cpu) && nr_iowait_cpu(cpu))
		iowait += arch_idle_time(cpu);
	return iowait;
}

#else

static u64 get_idle_time(int cpu)
{
	u64 idle, idle_time = -1ULL;

	if (cpu_online(cpu))
		idle_time = get_cpu_idle_time_us(cpu, NULL);

	if (idle_time == -1ULL)
		
		idle = kcpustat_cpu(cpu).cpustat[CPUTIME_IDLE];
	else
		idle = nsecs_to_jiffies64(idle_time);

	return idle;
}

static u64 get_iowait_time(int cpu)
{
	u64 iowait, iowait_time = -1ULL;

	if (cpu_online(cpu))
		iowait_time = get_cpu_iowait_time_us(cpu, NULL);

	if (iowait_time == -1ULL)

		iowait = kcpustat_cpu(cpu).cpustat[CPUTIME_IOWAIT];
	else
		iowait = nsecs_to_jiffies64(iowait_time);

	return iowait;
}
#endif


    static int meminfo_proc_show(struct seq_file *m, void *v){
        int contador_general = 0;
        int contador_run = 0;
        int contador_sleep = 0;
        int contador_stop = 0;
        int contador_zombie = 0;

        int i;
	    u64 user, nice, system, idle, iowait, irq, softirq, steal,NonIdle;
	    u64 prevuser, prevnice, prevsystem, previdle, previowait, previrq, prevsoftirq, prevsteal,prevNonIdle;


        user = nice = system = idle = iowait = 
        irq = softirq = steal = NonIdle = 0;

        prevuser = prevnice = prevsystem = previdle = previowait = 
        previrq = prevsoftirq = prevsteal = prevNonIdle = 0;

	for_each_possible_cpu(i) {
		user += kcpustat_cpu(i).cpustat[CPUTIME_USER];
		nice += kcpustat_cpu(i).cpustat[CPUTIME_NICE];
		system += kcpustat_cpu(i).cpustat[CPUTIME_SYSTEM];
		idle += get_idle_time(i);
		iowait += get_iowait_time(i);
		irq += kcpustat_cpu(i).cpustat[CPUTIME_IRQ];
		softirq += kcpustat_cpu(i).cpustat[CPUTIME_SOFTIRQ];
		steal += kcpustat_cpu(i).cpustat[CPUTIME_STEAL];
	}


    seq_printf(m,"{\"USAGE\" :[\n");
	seq_printf(m,"{\"user\":%llu,\"nice\":%llu,\"system\":%llu,\"idle\":%llu,\"iowait\":%llu,\"irq\":%llu,\"softirq\":%llu,\"steal\":%llu}],\n",
		jiffies_64_to_clock_t(user),
		jiffies_64_to_clock_t(nice),
		jiffies_64_to_clock_t(system),
		jiffies_64_to_clock_t(idle),
		jiffies_64_to_clock_t(iowait),
		jiffies_64_to_clock_t(irq),
		jiffies_64_to_clock_t(softirq),
		jiffies_64_to_clock_t(steal));


        struct task_struct *task;
 
        seq_printf(m," \"PROC\":[\n");
        for_each_process(task){
                 // struct list_head *list;
                //seq_printf(m,"{PROC_ID:%d,PROC_NAME:\"%s\",USER_ID:%d,ESTATE:",task->pid,task->comm,task->cred->uid);
			seq_printf(m,"{\"PROC_ID\":%d,\"PROC_NAME\":\"%s\",\"USER_ID\":%d,\"PARENT_ID\":%d,\"MEMORY\":%d,\"ESTATE\":",task->pid,task->comm,task->cred->uid, task->parent->pid,task->usage);
                switch(task->state){
                                case 0: seq_printf(m,"\"R\","); contador_run = contador_run + 1;
                                break;

                                case 1: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                                break;

                                case 2: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                                break;

                                case 4: seq_printf(m,"\"T\","); contador_stop = contador_stop + 1;
                                break;

                                case 8: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                                break;

                                case 32: seq_printf(m,"\"Z\","); contador_zombie = contador_zombie + 1;
                                break;

                                default: seq_printf(m,"\"S\","); contador_sleep = contador_sleep + 1;
                }

                                if(task->mm)
                                {
                                //seq_printf(m,"MEMORY_USED:%8lu},",task->mm->task_size);
                                seq_printf(m,"\"MEMORY_USED\":%8lu},",task->mm->mmap->vm_end - task->mm->mmap->vm_start);
                                }
                                else
                                {
                                 seq_printf(m,"\"MEMORY_USED\":0},");
                                }
                seq_printf(m,"\n");
                contador_general = contador_general +1;

        }
        seq_printf(m,"{\"PROC_ID\":3791,\"PROC_NAME\":\"server\",\"USER_ID\":1000,\"PARENT_ID\":3768,\"ESTATE\":\"R\",\"MEMORY_USED\": 2498560} \n]}");


        //imprime resumen de estadisticas de procesos
        //seq_printf(m,"{TOTAL=%d, RUN=%d, SLEEP=%d, STOPPED=%d, ZOMBIE=%d}",contador_general, contador_run, contador_sleep,contador_stop, co>
        
        return 0;
    }

    static void __exit final(void)
    {
         printk(KERN_INFO "SUFICIENCIA.\r\n");
         remove_proc_entry("cpu_201213255", NULL);
    }

    static int meminfo_proc_open(struct inode *inode, struct file *file)
    {
        return single_open(file, meminfo_proc_show, NULL);
    }

    static const struct file_operations meminfo_proc_fops = {
        .owner      = THIS_MODULE,
        .open       = meminfo_proc_open,
        .read       = seq_read,
        .llseek     = seq_lseek,
        .release    = single_release,
    };

    static int __init inicio(void) //Escribe archivo en /proc
    {
        printk(KERN_INFO "NUMERO DE CARNET: 201213255.\r\n");
        proc_create("cpu_201213255", 0777, NULL, &meminfo_proc_fops);
        return 0;
    }


    module_init(inicio);
    module_exit(final);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Leonel Avila 201213255");
MODULE_DESCRIPTION("Monitor de Procesos");
MODULE_VERSION("1.0");
