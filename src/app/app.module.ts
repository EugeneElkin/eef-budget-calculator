import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalculationComponent } from "./components/calculation.component/calculation.component";
import { EditableCalculationRowComponent } from "./components/editable-calculation-row.component/editable-calculation-row.component";
import { FormsModule } from "@angular/forms";
import { SumArrayPipe } from './pipes/sum-array.pipe';
import { CalculationRowComponent } from './components/calculation-row.component/calculation-row.component';
import { OnlyIfPropTruePipe } from './pipes/only-if-prop-true.pipe';
import { OnlyIfPropFalsePipe } from './pipes/only-if-prop-false.pipe'

@NgModule({
  declarations: [
    AppComponent,
    CalculationComponent,
    EditableCalculationRowComponent,
    SumArrayPipe,
    CalculationRowComponent,
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
