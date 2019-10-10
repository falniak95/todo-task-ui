import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  successTimeOut = 4000;
  errorTimeOut = 4000;
  infoTimeOut = 4000;
  warnTimeOut = 4000;
  defaultPosition = 'top-center';

  constructor(private toastService: MessageService) {
  }

  success(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: this.defaultPosition, severity: 'success', detail: message, life: timeOut });
  }

  error(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: this.defaultPosition, severity: 'error', detail: message, life: timeOut });
  }

  info(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: this.defaultPosition, severity: 'info', detail: message, life: timeOut });
  }

  warn(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: this.defaultPosition, severity: 'warn', detail: message, life: timeOut });
  }

  // TOP RIGHT
  successTopRight(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: 'top-right', severity: 'success', detail: message, life: timeOut });
  }

  errorTopRight(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: 'top-right', severity: 'error', detail: message, life: timeOut });
  }

  infoTopRight(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: 'top-right', severity: 'info', detail: message, life: timeOut });
  }

  warnTopRight(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: 'top-right', severity: 'warn', detail: message, life: timeOut });
  }

  // TOP LEFT
  successTopLeft(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: 'top-left', severity: 'success', detail: message, life: timeOut });
  }

  errorTopLeft(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: 'top-left', severity: 'error', detail: message, life: timeOut });
  }

  infoTopLeft(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: 'top-left', severity: 'info', detail: message, life: timeOut });
  }

  warnTopLeft(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: 'top-left', severity: 'warn', detail: message, life: timeOut });
  }

  // CENTER
  successCenter(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: 'center', severity: 'success', detail: message, life: timeOut });
  }

  errorCenter(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: 'center', severity: 'error', detail: message, life: timeOut });
  }

  infoCenter(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: 'center', severity: 'info', detail: message, life: timeOut });
  }

  warnCenter(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: 'center', severity: 'warn', detail: message, life: timeOut });
  }

  // BOTTOM RIGHT
  successBottomRight(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: 'bottom-right', severity: 'success', detail: message, life: timeOut });
  }

  errorBottomRight(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: 'bottom-right', severity: 'error', detail: message, life: timeOut });
  }

  infoBottomRight(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: 'bottom-right', severity: 'info', detail: message, life: timeOut });
  }

  warnBottomRight(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: 'bottom-right', severity: 'warn', detail: message, life: timeOut });
  }

  // BOTTOM LEFT
  successBottomLeft(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: 'bottom-left', severity: 'success', detail: message, life: timeOut });
  }

  errorBottomLeft(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: 'bottom-left', severity: 'error', detail: message, life: timeOut });
  }

  infoBottomLeft(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: 'bottom-left', severity: 'info', detail: message, life: timeOut });
  }

  warnBottomLeft(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: 'bottom-left', severity: 'warn', detail: message, life: timeOut });
  }

  // BOTTOM CENTER
  successBottomCenter(message: string, timeOut = this.successTimeOut) {
    this.toastService.add({ key: 'bottom-center', severity: 'success', detail: message, life: timeOut });
  }

  errorBottomCenter(message: string, timeOut = this.errorTimeOut) {
    this.toastService.add({ key: 'bottom-center', severity: 'error', detail: message, life: timeOut });
  }

  infoBottomCenter(message: string, timeOut = this.infoTimeOut) {
    this.toastService.add({ key: 'bottom-center', severity: 'info', detail: message, life: timeOut });
  }

  warnBottomCenter(message: string, timeOut = this.warnTimeOut) {
    this.toastService.add({ key: 'bottom-center', severity: 'warn', detail: message, life: timeOut });
  }


  clear() {

  }

}
