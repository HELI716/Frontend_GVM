import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/core';
import { DateSelectArg } from '@fullcalendar/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarVisible: boolean = true;
  menuItems: MenuItem[] = [];
  activeItem: string = 'dashboard';
  date: Date = new Date();
  events: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    selectable: true,
    select: this.handleDateSelect.bind(this)
  };

  upcomingEvents = [
    {
      date: new Date('2024-03-20'),
      title: 'Cattle Health Check',
      description: 'Regular health checkup for dairy cattle',
      time: '10:00 AM'
    },
    {
      date: new Date('2024-03-22'),
      title: 'Milk Production Review',
      description: 'Monthly review of milk production metrics',
      time: '2:00 PM'
    },
    {
      date: new Date('2024-03-25'),
      title: 'Feed Stock Assessment',
      description: 'Quarterly feed inventory check',
      time: '11:30 AM'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        styleClass: this.activeItem === 'dashboard' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('dashboard')
      },
      {
        label: 'Cattle Management',
        icon: 'pi pi-box',
        styleClass: this.activeItem === 'cattle' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('cattle')
      },
      {
        label: 'Client Management',
        icon: 'pi pi-users',
        styleClass: this.activeItem === 'clients' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('clients')
      },
      {
        label: 'User Management',
        icon: 'pi pi-user',
        styleClass: this.activeItem === 'users' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('users')
      },
      {
        label: 'Farmer Management',
        icon: 'pi pi-user-plus',
        styleClass: this.activeItem === 'farmers' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('farmers')
      },
      {
        label: 'Configuration',
        icon: 'pi pi-cog',
        styleClass: this.activeItem === 'config' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('config')
      },
      {
        label: 'Subscription',
        icon: 'pi pi-credit-card',
        styleClass: this.activeItem === 'subscription' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('subscription')
      },
      {
        label: 'Support',
        icon: 'pi pi-question-circle',
        styleClass: this.activeItem === 'support' ? 'active-menu-item' : '',
        command: () => this.handleMenuClick('support')
      }
    ];
  }

  handleMenuClick(route: string) {
    this.activeItem = route;
    this.menuItems = this.menuItems.map(item => ({
      ...item,
      styleClass: item.command && item.command.toString().includes(route) ? 'active-menu-item' : ''
    }));
    
    // Navigate to the route
    this.router.navigate([route]);
  }

  onLogout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  handleDateClick(arg: any) {
    // Handle date click
    console.log('Date clicked:', arg.date);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // Handle date selection
    console.log('Date selected:', selectInfo);
  }
}

