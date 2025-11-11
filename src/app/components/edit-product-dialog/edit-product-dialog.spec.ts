import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EditProductDialog, Product } from './edit-product-dialog';

describe('EditProductDialog', () => {
  let component: EditProductDialog;
  let fixture: ComponentFixture<EditProductDialog>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockProduct: Product = {
    id: 1,
    name: 'Café Americano',
    category: 'Bebidas Calientes',
    price: 25.50,
    stock: 50,
    description: 'Café negro sin azúcar, tostado medio.',
    barcode: '1234567890123',
    status: 'Activo'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProductDialog,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { product: null, isEdit: false } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when in add mode', () => {
    expect(component.productForm.value).toEqual({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
      barcode: '',
      status: 'Activo'
    });
  });

  it('should validate required fields', () => {
    const form = component.productForm;
    
    expect(form.valid).toBeFalse();

    form.patchValue({
      name: 'Test Product',
      category: 'Bebidas Calientes',
      price: 10,
      stock: 5
    });

    expect(form.valid).toBeTrue();
  });

  it('should call onSave and close dialog with product data when form is valid', () => {
    component.productForm.patchValue({
      name: 'Test Product',
      category: 'Bebidas Calientes',
      price: 10,
      stock: 5,
      description: 'Test description',
      barcode: '123456789',
      status: 'Activo'
    });

    component.onSave();

    setTimeout(() => {
      expect(mockDialogRef.close).toHaveBeenCalledWith(jasmine.any(Object));
    }, 600);
  });

  it('should call onCancel and close dialog with null', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });

  it('should have categories array defined', () => {
    expect(component.categories).toBeDefined();
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.productForm.patchValue({
      name: '',
      category: '',
      price: 0,
      stock: 0
    });

    expect(component.productForm.valid).toBeFalse();
    expect(component.name?.hasError('required')).toBeTrue();
    expect(component.category?.hasError('required')).toBeTrue();
  });
});