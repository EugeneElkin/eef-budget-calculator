import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalculationComponent } from "./components/calculation.component";
import { NewRowComponent } from "./components/new-row.component";
import { FormsModule } from "@angular/forms";
import { SumArrayPipe } from './pipes/sum-array.pipe';
import { EditableRowComponent } from './components/editable-row.component';
import { OnlyIfPropTruePipe } from './pipes/only-if-prop-true.pipe';
import { OnlyIfPropFalsePipe } from './pipes/only-if-prop-false.pipe'

@NgModule({
  declarations: [
    AppComponent,
    CalculationComponent,
    NewRowComponent,
    SumArrayPipe,
    EditableRowComponent,
    OnlyIfPropTruePipe,
    OnlyIfPropFalsePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
